-- Club Ciné — schéma initial.
-- Comptes (profils), classes, groupes, contenus pédagogiques, progression, projets,
-- et règles d'accès par ligne (RLS) pour les rôles élève et enseignant.

-- ───────────────────────── Types ─────────────────────────

create type public.user_role as enum ('eleve', 'enseignant');
create type public.content_status as enum ('a_relire', 'valide');

-- ───────────────────────── Comptes ─────────────────────────

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'eleve',
  display_name text not null check (char_length(display_name) between 1 and 40),
  created_at timestamptz not null default now()
);
comment on table public.profiles is
  'Un profil par compte. Données minimales : un prénom ou pseudonyme, pas d''e-mail ni de nom de famille.';

-- Tout nouveau compte est élève. Le rôle enseignant s'attribue à la main (voir supabase/README.md) :
-- un compte ne peut jamais se promouvoir lui-même.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'display_name'), 40), ''), 'Élève'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────── Classes et groupes ─────────────────────────

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  teacher_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  join_code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  created_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  unique (id, class_id)
);

create table public.class_members (
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  group_id uuid,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_id),
  -- Le groupe doit appartenir à la même classe.
  foreign key (group_id, class_id) references public.groups (id, class_id) on delete set null (group_id)
);
create index class_members_student_idx on public.class_members (student_id);
create index class_members_group_idx on public.class_members (group_id);

-- ───────────────────────── Contenus pédagogiques ─────────────────────────
-- Les contenus sont communs à toutes les classes. Un contenu « a_relire » n'est visible
-- que des enseignants ; il devient visible des élèves une fois « valide ».

create table public.periods (
  id text primary key,
  position int not null,
  title text not null,
  years text not null,
  level smallint not null check (level between 1 and 3),
  summary text not null,
  key_points text[] not null default '{}',
  films text[] not null default '{}',
  status public.content_status not null default 'a_relire',
  updated_at timestamptz not null default now()
);

create table public.terms (
  id text primary key,
  term text not null,
  category text not null check (category in ('Cadre', 'Mouvement', 'Montage', 'Son', 'Lumière', 'Récit')),
  level smallint not null check (level between 1 and 3),
  definition text not null,
  example text,
  status public.content_status not null default 'a_relire',
  updated_at timestamptz not null default now()
);

create table public.directors (
  id text primary key,
  name text not null,
  dates text not null,
  country text not null,
  level smallint not null check (level between 1 and 3),
  bio text not null,
  style text[] not null default '{}',
  films text[] not null default '{}',
  status public.content_status not null default 'a_relire',
  updated_at timestamptz not null default now()
);

-- Quiz d'entraînement, non noté : la bonne réponse est lisible côté client.
create table public.questions (
  id text primary key,
  level smallint not null check (level between 1 and 3),
  theme text not null check (theme in ('Histoire', 'Vocabulaire', 'Réalisateurs')),
  question text not null,
  choices text[] not null check (cardinality(choices) between 2 and 6),
  answer smallint not null,
  explanation text not null,
  status public.content_status not null default 'a_relire',
  updated_at timestamptz not null default now(),
  check (answer >= 0 and answer < cardinality(choices))
);

create function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger periods_touch before update on public.periods for each row execute function public.touch_updated_at();
create trigger terms_touch before update on public.terms for each row execute function public.touch_updated_at();
create trigger directors_touch before update on public.directors for each row execute function public.touch_updated_at();
create trigger questions_touch before update on public.questions for each row execute function public.touch_updated_at();

-- ───────────────────────── Progression ─────────────────────────

create table public.progress (
  student_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('period', 'term', 'director')),
  content_id text not null,
  done_at timestamptz not null default now(),
  primary key (student_id, kind, content_id)
);

create table public.quiz_scores (
  student_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  level smallint not null check (level between 1 and 3),
  best_score smallint not null check (best_score between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (student_id, level)
);

-- On ne conserve que le meilleur score : un moins bon essai ne l'écrase pas.
create function public.keep_best_score()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.best_score := greatest(old.best_score, new.best_score);
  new.updated_at := now();
  return new;
end;
$$;

create trigger quiz_scores_keep_best
  before update on public.quiz_scores
  for each row execute function public.keep_best_score();

-- ───────────────────────── Projets de groupe ─────────────────────────

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  kind text not null default '',
  pitch text not null default '',
  due_date date,
  created_at timestamptz not null default now()
);
create index projects_group_idx on public.projects (group_id);

-- Une ligne = une étape terminée. Décocher une étape = supprimer la ligne.
create table public.project_steps (
  project_id uuid not null references public.projects (id) on delete cascade,
  step text not null check (step in ('note', 'scenario', 'decoupage', 'tournage', 'montage', 'projection')),
  done_by uuid default auth.uid() references public.profiles (id) on delete set null,
  done_at timestamptz not null default now(),
  primary key (project_id, step)
);

-- ───────────────────────── Fonctions d'accès ─────────────────────────
-- « security definer » : elles lisent les tables sans repasser par les règles RLS,
-- ce qui évite les récursions entre politiques.

create function public.is_teacher()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'enseignant');
$$;

create function public.teaches_class(cid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.classes where id = cid and teacher_id = (select auth.uid()));
$$;

create function public.in_class(cid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.class_members where class_id = cid and student_id = (select auth.uid()));
$$;

create function public.teaches_student(sid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.class_members m
    join public.classes c on c.id = m.class_id
    where m.student_id = sid and c.teacher_id = (select auth.uid())
  );
$$;

create function public.shares_class_with(pid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.class_members mine
    join public.class_members theirs on theirs.class_id = mine.class_id
    where mine.student_id = (select auth.uid()) and theirs.student_id = pid
  ) or exists (
    -- un élève voit le nom de son enseignant·e
    select 1 from public.class_members mine
    join public.classes c on c.id = mine.class_id
    where mine.student_id = (select auth.uid()) and c.teacher_id = pid
  );
$$;

create function public.in_group(gid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.class_members where group_id = gid and student_id = (select auth.uid()));
$$;

create function public.teaches_group(gid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.groups g
    join public.classes c on c.id = g.class_id
    where g.id = gid and c.teacher_id = (select auth.uid())
  );
$$;

create function public.can_access_project(pid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.projects p
    where p.id = pid and (public.in_group(p.group_id) or public.teaches_group(p.group_id))
  );
$$;

-- Rejoindre une classe avec le code donné par l'enseignant·e.
create function public.join_class(code text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  cid uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'Connexion requise';
  end if;
  select id into cid from public.classes where join_code = upper(trim(code));
  if cid is null then
    raise exception 'Code de classe inconnu';
  end if;
  insert into public.class_members (class_id, student_id)
  values (cid, (select auth.uid()))
  on conflict do nothing;
  return cid;
end;
$$;

revoke execute on all functions in schema public from public, anon;
grant execute on function
  public.is_teacher(), public.teaches_class(uuid), public.in_class(uuid), public.teaches_student(uuid),
  public.shares_class_with(uuid), public.in_group(uuid), public.teaches_group(uuid),
  public.can_access_project(uuid), public.join_class(text)
to authenticated;

-- ───────────────────────── Droits et RLS ─────────────────────────
-- Rien n'est accessible sans connexion.

revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;

-- Profil : seul le nom affiché est modifiable. Ni le rôle ni l'identifiant.
revoke insert, update, delete on public.profiles from authenticated;
grant update (display_name) on public.profiles to authenticated;

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.groups enable row level security;
alter table public.class_members enable row level security;
alter table public.periods enable row level security;
alter table public.terms enable row level security;
alter table public.directors enable row level security;
alter table public.questions enable row level security;
alter table public.progress enable row level security;
alter table public.quiz_scores enable row level security;
alter table public.projects enable row level security;
alter table public.project_steps enable row level security;

-- profiles
create policy profiles_select on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.teaches_student(id) or public.shares_class_with(id));
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- classes
create policy classes_select on public.classes for select to authenticated
  using (teacher_id = (select auth.uid()) or public.in_class(id));
create policy classes_insert on public.classes for insert to authenticated
  with check (teacher_id = (select auth.uid()) and public.is_teacher());
create policy classes_update on public.classes for update to authenticated
  using (teacher_id = (select auth.uid())) with check (teacher_id = (select auth.uid()));
create policy classes_delete on public.classes for delete to authenticated
  using (teacher_id = (select auth.uid()));

-- groups
create policy groups_select on public.groups for select to authenticated
  using (public.teaches_class(class_id) or public.in_class(class_id));
create policy groups_insert on public.groups for insert to authenticated
  with check (public.teaches_class(class_id));
create policy groups_update on public.groups for update to authenticated
  using (public.teaches_class(class_id)) with check (public.teaches_class(class_id));
create policy groups_delete on public.groups for delete to authenticated
  using (public.teaches_class(class_id));

-- class_members : les élèves entrent par join_class() ; l'enseignant·e répartit dans les groupes.
create policy members_select on public.class_members for select to authenticated
  using (public.teaches_class(class_id) or public.in_class(class_id));
create policy members_update on public.class_members for update to authenticated
  using (public.teaches_class(class_id)) with check (public.teaches_class(class_id));
create policy members_delete on public.class_members for delete to authenticated
  using (public.teaches_class(class_id) or student_id = (select auth.uid()));

-- contenus : mêmes règles pour les quatre tables
create policy periods_select on public.periods for select to authenticated
  using (status = 'valide' or public.is_teacher());
create policy periods_write on public.periods for all to authenticated
  using (public.is_teacher()) with check (public.is_teacher());

create policy terms_select on public.terms for select to authenticated
  using (status = 'valide' or public.is_teacher());
create policy terms_write on public.terms for all to authenticated
  using (public.is_teacher()) with check (public.is_teacher());

create policy directors_select on public.directors for select to authenticated
  using (status = 'valide' or public.is_teacher());
create policy directors_write on public.directors for all to authenticated
  using (public.is_teacher()) with check (public.is_teacher());

create policy questions_select on public.questions for select to authenticated
  using (status = 'valide' or public.is_teacher());
create policy questions_write on public.questions for all to authenticated
  using (public.is_teacher()) with check (public.is_teacher());

-- progress : l'élève gère la sienne, l'enseignant·e lit celle de ses élèves
create policy progress_select on public.progress for select to authenticated
  using (student_id = (select auth.uid()) or public.teaches_student(student_id));
create policy progress_insert on public.progress for insert to authenticated
  with check (student_id = (select auth.uid()));
create policy progress_delete on public.progress for delete to authenticated
  using (student_id = (select auth.uid()));

-- quiz_scores
create policy quiz_select on public.quiz_scores for select to authenticated
  using (student_id = (select auth.uid()) or public.teaches_student(student_id));
create policy quiz_insert on public.quiz_scores for insert to authenticated
  with check (student_id = (select auth.uid()));
create policy quiz_update on public.quiz_scores for update to authenticated
  using (student_id = (select auth.uid())) with check (student_id = (select auth.uid()));

-- projects : créés par l'enseignant·e, lus par le groupe
create policy projects_select on public.projects for select to authenticated
  using (public.in_group(group_id) or public.teaches_group(group_id));
create policy projects_insert on public.projects for insert to authenticated
  with check (public.teaches_group(group_id));
create policy projects_update on public.projects for update to authenticated
  using (public.teaches_group(group_id)) with check (public.teaches_group(group_id));
create policy projects_delete on public.projects for delete to authenticated
  using (public.teaches_group(group_id));

-- project_steps : cochées et décochées par le groupe ou l'enseignant·e
create policy steps_select on public.project_steps for select to authenticated
  using (public.can_access_project(project_id));
create policy steps_insert on public.project_steps for insert to authenticated
  with check (public.can_access_project(project_id) and done_by = (select auth.uid()));
create policy steps_delete on public.project_steps for delete to authenticated
  using (public.can_access_project(project_id));
