# Club Ciné — charte graphique

Club Ciné est l'outil pédagogique du club cinéma (collège / lycée) : histoire du cinéma, vocabulaire, réalisateurs, ateliers d'écriture et de storyboard, quiz, carnets de groupe.

L'univers visuel est celui du **programme de cinéma d'art et d'essai** : un papier crème, un bordeaux profond de fauteuil de velours, des touches dorées comme sur une affiche ancienne, des titres à empattements. C'est chaleureux, cultivé, et différent du noir-et-rouge vif qu'utilisent la plupart des plateformes du secteur.

> Nom : la maquette dit « Ciné-club », l'app dit « Club Ciné ». À trancher avec l'enseignant ; la charte utilise « Club Ciné » en attendant.

## Principes

1. **Un programme de salle, pas une plateforme de streaming.** Fond crème, bandeau bordeaux en tête, beaucoup d'air. On doit avoir l'impression de feuilleter le programme d'un cinéma de quartier.
2. **Le bordeaux structure, l'or décore.** Le bordeaux porte les titres de section, les actions et la progression. L'or n'apparaît qu'en petites touches (étoiles, pictos) et ne porte jamais seul une information.
3. **Des filets, pas d'ombres.** Les séparations sont des filets rosés (`line`), jamais des ombres portées.
4. **Lisible au fond de la classe.** Texte 16px minimum, contrastes ≥ 4,5:1 dans les deux thèmes.
5. **Progressif.** Trois niveaux — Découverte, Approfondissement, Expert — écrits en toutes lettres, jamais codés par la couleur seule.

## Ton et écriture

- On s'adresse aux élèves en **tutoiement**, phrases courtes, verbes d'action : « Choisis ton plan », « Prépare la fiche d'analyse ».
- Les **termes techniques du cinéma sont toujours définis** au premier usage.
- Intitulés de section et boutons en **casse de phrase** : « Film de la semaine », « Prochaines séances ». Pas de majuscules partout.
- Pas d'emoji dans l'interface. Le ✓ / ✗ est réservé aux réponses de quiz.

## Couleurs

Deux thèmes : **Crème** (principal, écran et impression) et **Salle** (sombre, pour projeter en salle obscure).

| Rôle | Token | Crème | Salle | Règle |
|---|---|---|---|---|
| Fond | `bg` | #f3eae0 | #140b0c | Fond de page |
| Surface | `surface` | #fbf6ef | #1f1314 | Cartes, champs, boutons neutres |
| Filet | `line` | #d6a39c | #3d2427 | Séparateurs, jamais du texte |
| Texte | `text` | #1f1416 | #f3eae0 | Texte courant |
| Secondaire | `muted` | #6b5a5c | #b8a3a0 | Réalisateur, durée, libellés |
| Bordeaux texte | `accent` | #9e2b33 | #e8968f | Intitulés, lieux, liens, focus |
| Bordeaux aplat | `accent-fill` | #7a1b24 | #b3363f | Bouton principal, progression, affiche par défaut |
| Texte sur bordeaux | `accent-ink` | #f3eae0 | #f3eae0 | Uniquement sur `accent-fill` |
| Rosé | `accent-soft` / `accent-soft-ink` | #f6e6e2 / #4a0f16 | #3a1a1d / #f3eae0 | Tags d'activité |
| Bandeau | `band` / `band-ink` / `band-muted` | #4a0f16 / #f3eae0 / #d6a39c | idem | En-têtes d'écran et de carte |
| Or | `gold` | #c2a15e | #c2a15e | Décoratif : étoiles, pictos |
| Or lisible | `gold-text` | #7a5c1e | #d4b87a | Note écrite, mention dorée |
| Réussi | `ok` | #276b3e | #6fcf8e | Bonne réponse, étape faite |
| À revoir | `ko` | #9a5400 | #ffb347 | Mauvaise réponse — orange, pas bordeaux |

Règles :
- **Trois bordeaux, trois usages** : `band` pour les grands bandeaux, `accent-fill` pour les aplats d'action, `accent` pour le texte. On ne les échange pas.
- **L'or n'est jamais seul** : sur crème il ne fait que 2:1. Des étoiles dorées sont toujours suivies de la note écrite (« 4/5 » en `gold-text`).
- **Lieux et liens en `accent`**, pas dans un rouge plus clair : #b4534a ne fait que 4,1:1 sur crème.
- **Un bouton principal a toujours son fond** `accent-fill`. Texte crème sans fond = invisible (1:1).
- Les erreurs restent en orange (`ko`) pour ne pas se confondre avec le bordeaux de la marque, et sont toujours doublées d'un ✗ ou d'un mot.
- En thème Salle, le bordeaux des aplats est éclairci (#b3363f) : le bordeaux d'origine disparaîtrait sur le fond sombre.

## Typographie

- **Display — Georgia** : nom du club dans le bandeau, titres de page, titres de période, gros chiffres.
- **Sans — Avenir Next** (repli Segoe UI, puis police système) : tout le reste, y compris le titre des films (graisse 600).
- **Mono — Courier New** : uniquement les zones d'écriture de scénario.

| Style | Famille | Taille | Usage |
|---|---|---|---|
| `titre-accueil` | Georgia | 67px | Écran de connexion |
| `h1` | Georgia | 42px | Titre de page |
| `chiffre` | Georgia | 35px | Chiffres de tableau de bord |
| `h2` | Georgia | 19px | Titre de section |
| `periode` | Georgia | 18px | Titre de période dans la frise |
| `titre-film` | Avenir 600 | 19px | Titre d'un film dans une carte |
| `corps` | Avenir | 16px / 1,55 | Texte courant |
| `petit` | Avenir | 14px | Méta, lignes de carte |
| `intitule` | Avenir 500 | 14px, `accent` | Intitulé de section (« Film de la semaine ») |
| `libelle` | Avenir | 13px, MAJ, +0,08em | Libellés de champ |
| `tag` | Avenir | 11,5px | Étiquettes |
| `scenario` | Courier New | 15px | Écriture de scénario |

Aucune plateforme d'éducation au cinéma comparée (Lumni, HENRI, Nanouk, Upopi, Ersilia, Into Film) n'utilise de serif : la Georgia est le premier signe distinctif de Club Ciné, à garder.

Sur **Chromebook**, ni Avenir ni Georgia ne sont installées. Si le rendu y compte, ajouter deux polices Google Fonts proches.

## Espacements et formes

- Grille : 4 · 8 · 12 · 16 · 24 · 64 px (`space-1` à `space-5`, `space-8`).
- Arrondis : tags et croquis `radius-sm` (6px), boutons et affiches `radius-md` (8px), cartes `radius-lg` (14px), chips et navigation en pilule.
- Formats : affiches de film en **2:3**, images d'extraits et cases de storyboard en **16:9**.

## Éléments signature

- **Le bandeau bordeaux** (`band`) en tête des écrans et des cartes importantes, avec le nom en Georgia crème.
- **L'or en touches** : étoiles, picto pellicule sur l'affiche par défaut.
- **La carte film** : bandeau, affiche 2:3, tag rosé, note, séances séparées par des filets.
- **La frise** et **les étapes** passent en bordeaux plein quand elles sont faites.

## Icônes

Toujours en **SVG** (trait 1,75px, `currentColor`). Jamais d'emoji ni de police d'icônes : selon les postes, ils s'affichent en carrés vides, comme sur la première maquette.

## Accessibilité

- Focus clavier : contour 2px `accent`, décalé de 2px.
- Cibles tactiles d'au moins 36px de haut.
- Respecter `prefers-reduced-motion`.
- Aucune information par la couleur seule (niveaux, réponses, notes).

## Composants

Bandeau, boutons, tags et chips, cartes, **carte film**, étapes, frise, quiz — avec leurs classes CSS (`components/bundle.css`). Les noms de variables CSS de l'app (`--bg`, `--surface`, `--accent`, `--accent-fill`…) sont les mêmes que les tokens : il suffit de remplacer leurs valeurs dans l'app, puis d'ajouter les nouveaux (`--band`, `--gold`, `--accent-soft`…).
