# Discovery — Club Ciné

Interface pédagogique pour l'option cinéma-audiovisuel (CAV) au lycée.
Version 0.1 — 9 novembre 2026. Source : fiche Notion « app/interface pédagogique sur le cinéma » et cadrage initial.

> Statut des affirmations : ce qui concerne l'enseignant·e et sa classe est à ce stade une **hypothèse** tant qu'il ou elle ne l'a pas confirmé. Les points à vérifier sont regroupés en section 9.

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
