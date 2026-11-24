# Club Ciné

Outil pédagogique pour un club cinéma de lycée (et une future option cinéma-audiovisuel) : des ateliers à contrainte et un carnet de création par groupe — idée, scénario, storyboard, tournage, film — avec, au second plan, histoire du cinéma, vocabulaire, cinéastes et quiz.

- [`docs/discovery.md`](docs/discovery.md) — cadrage : utilisateurs, périmètre du MVP, risques, questions ouvertes.
- [`app/`](app) — prototype navigable (React, TypeScript, Vite).
- [`supabase/`](supabase) — schéma de la base, règles d'accès et corpus de départ pour le MVP.

## Démo en ligne

https://manmanvallet-ctrl.github.io/clubcin-/ — maquette publiée sur GitHub Pages à chaque push sur `main` (`.github/workflows/pages.yml`). Un bandeau rappelle que les données sont fictives, et la page demande aux moteurs de recherche de ne pas l'indexer (`noindex`). Ce n'est pas encore un outil à utiliser en classe : voir « À faire avant la mise en ligne ».

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

## À faire avant la mise en ligne

Points tirés d'une checklist « 20 choses à vérifier avant de mettre un site en ligne » (23/11/2026), triés pour un outil utilisé par des **élèves mineurs**.

**Avant tout usage en classe**
- [ ] **Clés Supabase** : seule la clé `anon` (publishable) va dans l'appli. La clé `service_role` ne doit jamais être dans le front ni sur GitHub.
- [ ] **Retester les règles d'accès (RLS)** (`supabase/tests/`) au moment de brancher le front sur la base.
- [ ] **Page de confidentialité** (RGPD, mineurs) : quelles données, pourquoi, combien de temps, qui y accède. Garder la minimisation prévue dans `docs/discovery.md` (prénom ou pseudo, pas d'e-mail élève, codes de classe, hébergement UE).
- [ ] **Mentions légales** (éditeur, hébergeur).
- [ ] **Sauvegardes** : l'offre gratuite de Supabase n'a pas de sauvegarde automatique quotidienne. Prévoir un export régulier ou une offre payante.
- [ ] **HTTPS** : automatique chez Supabase, Netlify ou Vercel ; Let's Encrypt sur un VPS.
- [ ] **Responsive** (téléphones des élèves) et **contraste / accessibilité** (RGAA).

**Utile**
- [ ] Textes alternatifs (`alt`) sur les images de contenu (`Illustrations.tsx`).
- [ ] Page 404 : avec React, une adresse inconnue peut donner un écran blanc.
- [ ] CGU : règles de conduite (ce que les élèves peuvent déposer).
- [x] Favicon (`app/public/favicon.svg`).

**Volontairement écarté** : analytics et bandeau cookies (pas de mesure d'audience sur des mineurs), référencement de l'espace élèves (à ne pas indexer). Le SEO ne servira que pour une éventuelle page de présentation aux autres lycées.
