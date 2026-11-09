# Club Ciné

Interface pédagogique pour l'option cinéma-audiovisuel au lycée : histoire du cinéma, vocabulaire, cinéastes, quiz par niveaux, suivi de progression et suivi des projets de groupe.

- [`docs/discovery.md`](docs/discovery.md) — cadrage : utilisateurs, périmètre du MVP, risques, questions ouvertes.
- [`app/`](app) — prototype navigable (React, TypeScript, Vite).

## Lancer le prototype

```bash
cd app
npm install
npm run dev
```

L'écran d'accueil propose des profils de démonstration (élève ou enseignant·e). Les données sont fictives et stockées dans le navigateur ; le bouton « Réinitialiser » les remet à zéro.

## État

Prototype de démonstration, sans serveur ni comptes réels. Le contenu pédagogique (`app/src/data/content.ts`) a été rédigé par IA et doit être relu par l'enseignant·e avant tout usage en classe.
