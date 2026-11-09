# Club Ciné

Outil pédagogique pour un club cinéma de lycée (et une future option cinéma-audiovisuel) : des ateliers à contrainte et un carnet de création par groupe — idée, scénario, storyboard, tournage, film — avec, au second plan, histoire du cinéma, vocabulaire, cinéastes et quiz.

- [`docs/discovery.md`](docs/discovery.md) — cadrage : utilisateurs, périmètre du MVP, risques, questions ouvertes.
- [`app/`](app) — prototype navigable (React, TypeScript, Vite).
- [`supabase/`](supabase) — schéma de la base, règles d'accès et corpus de départ pour le MVP.

## Lancer le prototype

```bash
cd app
npm install
npm run dev
```

L'écran d'accueil propose des profils de démonstration (élève ou enseignant·e). Les données sont fictives et stockées dans le navigateur ; le bouton « Réinitialiser » les remet à zéro.

`npm run build:artifact` assemble la maquette en une seule page HTML autonome, pour la partager sans rien installer.

## État

Prototype de démonstration, sans serveur ni comptes réels. Le contenu pédagogique (`app/src/data/content.ts` et `app/src/data/ateliers.ts`) a été rédigé par IA et doit être relu par l'enseignant·e avant tout usage en classe.
