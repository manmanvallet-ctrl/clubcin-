# Discovery — Club Ciné

Interface pédagogique pour l'option cinéma-audiovisuel (CAV) au lycée.
Version 0.2 — 9 novembre 2026. Source : fiche Notion « app/interface pédagogique sur le cinéma » et cadrage initial.

> Statut des affirmations : ce qui concerne l'enseignant·e et sa classe est à ce stade une **hypothèse** tant qu'il ou elle ne l'a pas confirmé. Les points à vérifier sont regroupés en section 9.

> **Mise à jour du 9 novembre 2026.** L'enseignant a répondu au questionnaire de cadrage. Ses réponses déplacent la priorité : de « apprendre et suivre » vers « aider à créer ». La section 13 fait foi là où elle contredit les sections 2 à 6, rédigées avant ses réponses.

## 1. Le projet en une phrase

Un espace en ligne où les élèves d'option cinéma apprennent en autonomie (histoire, vocabulaire, cinéastes, quiz par niveaux) et suivent leur projet de groupe, et où l'enseignant·e voit la progression de chacun et l'avancement des films.

## 2. Ce que l'on sait

| Décision | Choix retenu |
| --- | --- |
| Public | Lycée, option CAV |
| Premier utilisateur | Un·e enseignant·e proche de la porteuse du projet, et sa classe |
| Contenu | Rédigé par IA, relu et validé par l'enseignant·e |
| Rubriques | Histoire du cinéma, vocabulaire, réalisateurs |
| Structure | Niveaux de difficulté, espace élève, espace enseignant, groupes |
| Projets | Centraliser l'avancement des projets (réalisations des élèves) |

## 3. Utilisateurs et besoins

**L'élève (15–18 ans).** A choisi l'option par goût, niveau de culture cinématographique très variable. Travaille surtout sur téléphone, par sessions courtes.
- Réviser les notions vues en cours et les retrouver vite (« c'est quoi déjà un plan américain ? »).
- Savoir où il en est et quoi faire ensuite.
- Savoir où en est le film du groupe et ce qu'il reste à faire.

**L'enseignant·e.** Souvent seul·e sur l'option dans l'établissement, parfois non spécialiste de formation, avec peu de temps de préparation.
- Repérer en un coup d'œil qui décroche et qui avance.
- Suivre plusieurs projets de groupe en parallèle sans courir après les informations.
- Se former en continu : un corpus fiable, organisé, où piocher pour préparer une séance.
- Garder la main sur le contenu : corriger, compléter, masquer.

**Le groupe (3–5 élèves).** Unité de travail des projets de réalisation ; l'avancement est collectif.

## 4. Problèmes à résoudre

1. Les ressources existent mais sont dispersées (manuels, sites, photocopies, liens) et rarement graduées par niveau.
2. Le suivi de progression se fait de mémoire ou sur tableur.
3. L'avancement des projets de groupe n'est visible qu'en classe, au moment où il est trop tard pour rattraper un retard.
4. L'auto-formation de l'enseignant·e n'a pas de lieu dédié.

## 5. Ce qui existe déjà

À connaître pour ne pas refaire, et vers quoi renvoyer (liste de mémoire, à vérifier) :

- **Upopi** (Ciclic) : cours de vocabulaire de l'analyse filmique, histoire des images.
- **Transmettre le cinéma** : fiches films et vidéos liées aux dispositifs Lycéens et apprentis au cinéma.
- **Le Kinétoscope** (L'Agence du court métrage) : courts métrages et pistes pédagogiques.
- **Lumni** : vidéos généralistes.
- **Pronote / ENT** : suivi scolaire général, sans rien de spécifique au cinéma ni aux projets de tournage.

Ce qui manque : un outil qui relie **apprentissage gradué + suivi de classe + suivi des projets de groupe**, à l'échelle d'une option. C'est le positionnement de Club Ciné : pas une encyclopédie de plus, mais le carnet de bord de l'option.

## 6. Périmètre

### MVP (à tester avec une classe)

| Bloc | Contenu |
| --- | --- |
| Apprendre | Frise d'histoire en périodes, glossaire filtrable, fiches cinéastes, tous gradués sur 3 niveaux |
| S'évaluer | Quiz par niveau, meilleur score conservé |
| Progresser | Tableau de bord élève : pourcentages par rubrique, prochaine action |
| Projets | Un projet par groupe, étapes de production cochables |
| Suivre | Tableau de bord enseignant : progression par élève et par groupe, élèves à accompagner, état des projets |
| Comptes | Connexion élève / enseignant, classes et groupes |

### Plus tard

- Éditeur de contenu pour l'enseignant·e (ajouter ses cours, valider le contenu IA).
- Analyse de séquence guidée (photogrammes annotés).
- Dépôt de documents de projet (scénario, storyboard, plan de tournage).
- Parcours « formation continue » pour l'enseignant·e.
- Alignement fin sur le programme et les œuvres au programme de terminale.

### Hors périmètre

- Hébergement ou diffusion de films et d'extraits.
- Notes et bulletins (rôle de Pronote).
- Messagerie entre élèves.

## 7. Modèle de contenu

- **Niveau** : 1 Découverte, 2 Approfondissement, 3 Expert. Hypothèse : niveaux de difficulté, pas niveaux de classe. Un élève de seconde peut atteindre le niveau 3.
- **Période** : titre, dates, résumé, points à retenir, films repères, niveau.
- **Notion** : terme, catégorie (cadre, mouvement, montage, son, lumière, récit), définition, exemple, niveau.
- **Cinéaste** : dates, pays, biographie courte, traits de style, films à voir, niveau.
- **Question** : thème, niveau, 4 choix, explication.
- **Projet** : groupe, type (exercice, fiction, documentaire), date de rendu, étapes (note d'intention → scénario → découpage → tournage → montage → projection).
- **Progression** : par élève, contenus lus ou maîtrisés, meilleurs scores.

Corpus de départ dans le prototype : 8 périodes, 26 notions, 12 cinéastes, 13 questions.

## 8. Risques

| Risque | Parade |
| --- | --- |
| **Données d'élèves mineurs (RGPD)** | Minimiser : prénom ou pseudonyme, pas d'e-mail élève si possible (codes de classe). Hébergement en UE. Accord du chef d'établissement avant tout usage réel. |
| **Erreurs dans le contenu généré par IA** | Rien n'est publié aux élèves sans validation ; statut « à relire / validé » par contenu. |
| **Droits sur les images et extraits** | Pas d'hébergement d'extraits ; liens vers des sources légitimes ; photogrammes au cas par cas. |
| **Faible usage par les élèves** | Mobile d'abord, sessions de 5 minutes, usage amorcé en classe par l'enseignant·e. |
| **Dépendance à une seule classe pilote** | Garder le modèle générique (classes, groupes) dès le départ. |

## 9. Questions pour l'enseignant·e

À poser lors d'un entretien de 30 minutes, prototype sous les yeux.

1. Option facultative, enseignement de spécialité, ou les deux ? Quels niveaux, combien d'élèves ?
2. Comment se déroule une année : part de théorie, d'analyse, de pratique ?
3. Quels projets de réalisation, à quel rythme, en groupes de combien ?
4. Qu'est-ce qui est le plus pénible à suivre aujourd'hui ?
5. Les trois niveaux doivent-ils correspondre à seconde / première / terminale, ou à une difficulté libre ?
6. Les élèves utiliseraient-ils l'outil en classe, à la maison, sur téléphone ?
7. Quelles ressources utilise-t-il ou elle déjà ? Que manque-t-il ?
8. Quelles contraintes de l'établissement (ENT, comptes, autorisations) ?
9. Faut-il noter, ou seulement suivre ?
10. Qu'est-ce qui ferait dire, en juin, que l'outil a servi ?

## 10. Choix techniques

**Prototype (fait).** React, TypeScript, Vite. Aucune base de données : contenus dans le code, progression dans le navigateur. Suffisant pour une démonstration, pas pour une classe réelle, puisque rien n'est partagé entre appareils.

**MVP (décidé).** Garder le front, ajouter Supabase (base Postgres, authentification, règles d'accès par ligne, région UE) : pas de serveur à maintenir, et les droits élève / enseignant / groupe s'expriment directement dans la base. Contenus déplacés en base avec un statut de validation. Le schéma et les règles d'accès sont dans [`supabase/`](../supabase/README.md) ; le branchement du front reste à faire.

## 11. Étapes

1. **Fait** — Cadrage et prototype navigable.
2. Entretien avec l'enseignant·e (section 9) et relecture du corpus.
3. Ajuster le périmètre du MVP d'après ses retours.
4. Comptes, classes, groupes et données partagées.
5. Test avec une classe sur une séquence de 3 à 4 semaines.
6. Bilan, puis éditeur de contenu.

## 12. Comment juger du succès

- L'enseignant·e ouvre le tableau de suivi au moins une fois par semaine.
- Plus de la moitié des élèves reviennent sans y être obligés.
- Chaque groupe tient son projet à jour sans relance.
- L'enseignant·e a corrigé ou ajouté du contenu : l'outil est devenu le sien.

## 13. Retours de l'enseignant

Source : questionnaire « Questions de cadrage – Outil pédagogique cinéma », rempli par l'enseignant le 9 novembre 2026.

### Ce qu'il a dit

| Sujet | Réponse |
| --- | --- |
| Situation | Un **club ciné**, pas encore d'option. Il passe la certification cette année pour demander l'ouverture (option facultative et spécialité, dans l'idéal). |
| Effectif | Une dizaine d'élèves, un seul enseignant, des intervenants extérieurs possibles. |
| Année type | Théorie surtout au 1er trimestre, puis pratique progressive appuyée sur des films et des techniques de mise en scène. |
| Projets | Des **ateliers à contrainte** (une scène où l'événement est hors champ, une rencontre amoureuse, un dialogue) et un court métrage. |
| Séance type | 1 h 30 sur la pause de midi, en salle de classe, peu de matériel : cadre, personnages, registre, puis storyboard, tournage de plans, essais. |
| Élèves | Très attirés par la création : ils veulent écrire et tourner. |
| **La seule chose à faire** | **« Proposer des supports pour faciliter la création (écriture, storyboard, script…) »** |
| Ce qui est pénible à suivre | « Je ne sais pas. » |
| Outils actuels | YouTube, CapCut, netboard.me pour partager des extraits ; WhatsApp et Google Docs pour faire circuler les fichiers. |
| Appareils | Téléphone d'abord, ordinateur aussi. Téléphone interdit par le règlement mais possible pour une option. Un PC avec Wi-Fi en salle, une salle informatique disponible. |
| Notation | Non : suivre la progression seulement. |
| Films et productions | Montrés via YouTube, plateformes ou DVD. Productions des élèves sur YouTube ou sur leurs téléphones. |
| Autorisations | Droit à l'image : oui. |
| Comptes | Les enseignants ont un compte Outlook de l'établissement. |
| Validation | La direction ; l'académie a le dernier mot pour les financements. |
| Temps disponible | 3 à 4 heures par semaine au maximum. |
| Contenu | Produit par lui, par les élèves et par nous. |
| Propriété | L'outil doit lui appartenir et le suivre s'il change d'établissement. |
| Bac | À préparer, une fois l'option ouverte. |
| Succès en juin | Le retour des élèves, et le sentiment d'avoir organisé ses séances plus efficacement. |

### Ce que ça change

1. **Le cœur de l'outil devient la création.** Le prototype actuel met en avant la frise, le glossaire, les quiz et le suivi. L'enseignant demande d'abord des supports pour écrire, storyboarder et préparer un tournage.
2. **Le tableau de suivi n'est pas un besoin ressenti.** À dix élèves, il les connaît tous. Le suivi reste utile plus tard, pour l'option et pour justifier le projet auprès de la direction, mais ne doit pas être le premier écran.
3. **L'unité de travail est l'atelier**, pas la « période » ni la « notion » : une contrainte, une séance de 1 h 30, un petit groupe, un rendu filmé.
4. **Le vocabulaire sert en situation.** Il a plus de valeur dans le storyboard (choisir « plan américain » et voir ce que c'est) que dans un glossaire à part.
5. **Rien à héberger en vidéo.** Les films et les rendus restent sur YouTube ; l'outil ne garde que des liens.
6. **Pas de SSO Microsoft.** L'outil doit lui appartenir et être transférable, donc ne pas dépendre des comptes de l'établissement. La connexion par code personnel convient, et le projet Supabase doit être créé à son nom ou transférable.
7. **Le droit à l'image compte.** Si les élèves ajoutent des photos de repérage ou des liens vers leurs films, il faut une autorisation parentale. Raison de plus pour ne stocker que du texte et des liens au départ.
8. **Peu de temps côté enseignant.** Avec 3 à 4 heures par semaine, il ne relira pas un gros corpus : des contenus courts, validés par petits lots.
9. **Les séances sont à préparer.** Son critère de succès parle d'organisation : une bibliothèque d'ateliers prêts à lancer lui sert directement.

### Périmètre du MVP révisé

| Priorité | Bloc | Contenu |
| --- | --- | --- |
| 1 | Ateliers | Bibliothèque d'exercices à contrainte : consigne, durée, notions travaillées, extraits de référence (liens). L'enseignant en lance un pour un groupe. |
| 1 | Carnet de création | Pour chaque atelier, un parcours guidé par groupe : idée et intention, personnages et cadre, scénario ou dialogue, storyboard plan par plan (échelle, angle, mouvement, action, son), liste de tournage, lien vers le film rendu. |
| 2 | Vocabulaire en contexte | Les notions du glossaire apparaissent dans le storyboard, avec leur définition. |
| 2 | Vue enseignant | Où en est chaque groupe dans son carnet ; lecture des écrits. |
| 3 | Culture ciné | Frise, cinéastes, quiz : conservés, au second plan. |
| Plus tard | Option et bac | Œuvres au programme, dossier, oral ; suivi de progression détaillé. |

### Maquette révisée

La maquette suit désormais ce périmètre : bibliothèque d'ateliers, carnet de création en six étapes (idée, cadre et personnages, scénario, storyboard avec croquis au doigt, tournage, film), vue des carnets pour l'enseignant. Précisions apportées par l'enseignant : aucun support papier aujourd'hui, le storyboard se fait au tableau avec les élèves et le scénario s'écrit ensemble avant d'être mis en page en ligne. Le carnet est donc pensé pour être rempli à plusieurs, projeté ou sur téléphone.

Le schéma `supabase/` date d'avant ce recentrage : sa table `projects` et ses étapes fixes sont à remplacer par les ateliers et les carnets avant tout branchement.

### Questions encore ouvertes

- Les élèves écrivent-ils à plusieurs sur le même document pendant la séance ?
- Le club compte-t-il des élèves de plusieurs niveaux ?
- La direction est-elle déjà au courant du projet ?
