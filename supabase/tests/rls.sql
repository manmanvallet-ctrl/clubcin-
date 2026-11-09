-- Tests des règles d'accès. S'arrête à la première assertion fausse.
-- Lancer avec : supabase/tests/run.sh
\set ON_ERROR_STOP on
\set prof   '00000000-0000-0000-0000-00000000000a'
\set prof2  '00000000-0000-0000-0000-00000000000b'
\set ines   '00000000-0000-0000-0000-000000000001'
\set malo   '00000000-0000-0000-0000-000000000002'
\set noe    '00000000-0000-0000-0000-000000000003'
\set intrus '00000000-0000-0000-0000-000000000009'

create schema t;
create function t.ok(cond boolean, label text) returns void language plpgsql as $$
begin
  if cond is not true then raise exception 'ÉCHEC : %', label; end if;
  raise notice 'ok  %', label;
end $$;

-- Vérifie qu'une requête est refusée (erreur) plutôt que silencieusement filtrée.
create function t.denied(query text, label text) returns void language plpgsql as $$
begin
  begin
    execute query;
  exception when others then
    raise notice 'ok  % (%)', label, sqlerrm;
    return;
  end;
  raise exception 'ÉCHEC : % — la requête aurait dû être refusée', label;
end $$;
grant usage on schema t to authenticated, anon;
grant execute on all functions in schema t to authenticated, anon;

-- ── Mise en place (superutilisateur) ──
insert into auth.users (id, raw_user_meta_data) values
  (:'prof',   '{"display_name": "Mme Prof"}'),
  (:'prof2',  '{"display_name": "M. Autre"}'),
  (:'ines',   '{"display_name": "Inès"}'),
  (:'malo',   '{"display_name": "Malo"}'),
  (:'noe',    '{"display_name": "Noé"}'),
  (:'intrus', '{}');
update public.profiles set role = 'enseignant' where id in (:'prof', :'prof2');
update public.periods set status = 'valide' where id = 'origines';

select t.ok((select count(*) = 6 from public.profiles), 'un profil est créé par compte');
select t.ok((select display_name = 'Élève' and role = 'eleve' from public.profiles where id = :'intrus'),
  'profil par défaut : élève, nom générique');

-- ── Enseignante : crée classe, groupes, projet ──
set role authenticated;
set request.jwt.claim.sub = :'prof';

insert into public.classes (id, name) values ('10000000-0000-0000-0000-000000000001', '1re CAV');
insert into public.groups (id, class_id, name) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Lumière'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Méliès');
select join_code as code from public.classes \gset
select t.ok((select count(*) = 8 from public.periods), 'enseignante : voit tout le contenu, validé ou non');

-- ── Élèves : rejoignent la classe ──
set request.jwt.claim.sub = :'ines';
select t.ok((select count(*) = 0 from public.classes), 'élève hors classe : ne voit aucune classe');
select public.join_class(lower(:'code')) is not null as joined \gset
select t.denied($$select public.join_class('FAUXCODE')$$, 'code de classe inconnu refusé');
set request.jwt.claim.sub = :'malo';
select public.join_class(:'code');
set request.jwt.claim.sub = :'noe';
select public.join_class(:'code');

-- ── Enseignante : répartit et crée les projets ──
set request.jwt.claim.sub = :'prof';
update public.class_members set group_id = '20000000-0000-0000-0000-000000000001' where student_id in (:'ines', :'malo');
update public.class_members set group_id = '20000000-0000-0000-0000-000000000002' where student_id = :'noe';
insert into public.projects (id, group_id, title) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'La Sortie du lycée'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'Le Casier n° 13');

-- ── Inès ──
set request.jwt.claim.sub = :'ines';
select t.ok((select count(*) = 1 from public.periods), 'élève : ne voit que le contenu validé');
select t.ok((select count(*) = 0 from public.terms), 'élève : contenu à relire invisible');
select t.ok((select count(*) = 4 from public.profiles), 'élève : voit ses camarades et son enseignante, pas les autres');
select t.ok((select count(*) = 1 from public.projects), 'élève : ne voit que le projet de son groupe');

insert into public.progress (kind, content_id) values ('period', 'origines');
insert into public.quiz_scores (level, best_score) values (1, 80);
update public.quiz_scores set best_score = 40 where level = 1;
select t.ok((select best_score = 80 from public.quiz_scores where level = 1), 'un moins bon score n''écrase pas le meilleur');
insert into public.project_steps (project_id, step) values ('30000000-0000-0000-0000-000000000001', 'note');

select t.denied(format($$insert into public.progress (student_id, kind, content_id) values (%L, 'period', 'muet')$$, :'malo'),
  'élève : ne peut pas écrire la progression d''un autre');
select t.denied($$update public.profiles set role = 'enseignant'$$, 'élève : ne peut pas se promouvoir enseignant');
select t.denied($$insert into public.classes (name) values ('Pirate')$$, 'élève : ne peut pas créer de classe');
select t.denied($$insert into public.project_steps (project_id, step) values ('30000000-0000-0000-0000-000000000002', 'note')$$,
  'élève : ne peut pas cocher une étape d''un autre groupe');
select t.denied($$insert into public.periods (id, position, title, years, level, summary) values ('x', 9, 'x', 'x', 1, 'x')$$,
  'élève : ne peut pas créer de contenu');
update public.periods set title = 'piraté';
update public.class_members set group_id = '20000000-0000-0000-0000-000000000002' where student_id = :'ines';
update public.profiles set display_name = 'Inès B.' where id = :'ines';
update public.profiles set display_name = 'piraté' where id = :'malo';

-- ── Malo (même groupe) ──
set request.jwt.claim.sub = :'malo';
select t.ok((select count(*) = 0 from public.progress), 'élève : ne voit pas la progression d''un camarade');
select t.ok((select count(*) = 1 from public.project_steps), 'même groupe : voit les étapes cochées');
select t.ok((select display_name = 'Malo' from public.profiles where id = :'malo'), 'un camarade ne peut pas renommer un autre');
delete from public.project_steps where step = 'note';
select t.ok((select count(*) = 0 from public.project_steps), 'même groupe : peut décocher une étape');

-- ── Noé (autre groupe) ──
set request.jwt.claim.sub = :'noe';
select t.ok((select title = 'Le Casier n° 13' from public.projects), 'autre groupe : voit seulement son projet');

-- ── Enseignante : suivi ──
set request.jwt.claim.sub = :'prof';
select t.ok((select count(*) = 1 from public.progress), 'enseignante : lit la progression de ses élèves');
select t.ok((select count(*) = 1 from public.quiz_scores), 'enseignante : lit les scores de ses élèves');
select t.ok((select title = 'Les origines' from public.periods where id = 'origines'), 'un élève n''a pas pu modifier le contenu');
select t.ok((select group_id = '20000000-0000-0000-0000-000000000001' from public.class_members where student_id = :'ines'),
  'un élève n''a pas pu changer de groupe seul');
select t.ok((select display_name = 'Inès B.' from public.profiles where id = :'ines'), 'un élève peut changer son nom affiché');
select t.denied(format($$insert into public.progress (student_id, kind, content_id) values (%L, 'period', 'muet')$$, :'ines'),
  'enseignante : ne peut pas écrire la progression d''un élève');
update public.terms set status = 'valide' where id = 'plan';

-- ── Autre enseignant : cloisonnement entre classes ──
set request.jwt.claim.sub = :'prof2';
select t.ok((select count(*) = 0 from public.classes), 'autre enseignant : ne voit pas la classe');
select t.ok((select count(*) = 0 from public.progress), 'autre enseignant : ne voit pas la progression');
select t.ok((select count(*) = 0 from public.projects), 'autre enseignant : ne voit pas les projets');
select t.ok((select count(*) = 1 from public.profiles), 'autre enseignant : ne voit que son profil');
select t.denied($$insert into public.groups (class_id, name) values ('10000000-0000-0000-0000-000000000001', 'Pirate')$$,
  'autre enseignant : ne peut pas créer de groupe dans la classe');

-- ── Compte sans classe ──
set request.jwt.claim.sub = :'intrus';
select t.ok((select count(*) = 0 from public.class_members), 'compte sans classe : ne voit aucun membre');
select t.ok((select count(*) = 1 from public.terms), 'compte sans classe : voit le contenu validé');

-- ── Non connecté ──
set role anon;
reset request.jwt.claim.sub;
select t.denied($$select * from public.periods$$, 'non connecté : aucun accès au contenu');
select t.denied($$select * from public.profiles$$, 'non connecté : aucun accès aux profils');
select t.denied($$select public.join_class('X')$$, 'non connecté : ne peut pas rejoindre une classe');

reset role;
\echo 'Tous les tests RLS passent.'
