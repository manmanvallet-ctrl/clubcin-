# Base de données (Supabase)

Schéma, règles d'accès et corpus de départ pour le MVP. Rien ici n'est encore branché sur le prototype `app/`, qui fonctionne toujours avec ses données de démonstration.

## Contenu

| Fichier | Rôle |
| --- | --- |
| `migrations/20261109000000_init.sql` | Tables, fonctions et règles d'accès par ligne (RLS) |
| `seed.sql` | Corpus de départ, généré depuis `app/src/data/content.ts` |
| `gen-seed.mjs` | Régénère `seed.sql` : `node supabase/gen-seed.mjs` |
| `tests/` | Tests des règles d'accès sur un Postgres local |

## Qui voit quoi

| | Élève | Enseignant·e |
| --- | --- | --- |
| Contenus | Lit ceux qui sont validés | Lit tout, corrige, valide |
| Classe | Rejoint avec un code, voit ses camarades | Crée ses classes et ses groupes |
| Progression | Gère la sienne uniquement | Lit celle de ses élèves |
| Projets | Voit et coche les étapes de son groupe | Crée et suit ceux de ses classes |

Sans connexion, rien n'est accessible. Un·e enseignant·e ne voit pas les classes d'un·e autre.

Deux choix à connaître :

- **Tout nouveau compte est élève.** Le rôle enseignant s'attribue à la main, et un compte ne peut pas se promouvoir lui-même.
- **Le corpus arrive avec le statut `a_relire`**, donc invisible des élèves tant qu'il n'a pas été validé.

## Mise en place sur un projet Supabase

1. Créer le projet en région UE (Paris ou Francfort).
2. Dans le SQL Editor, exécuter `migrations/20261109000000_init.sql`, puis `seed.sql`.
3. Créer le compte de l'enseignant·e (Authentication → Users), puis lui donner son rôle :

   ```sql
   update public.profiles set role = 'enseignant' where id = '<identifiant du compte>';
   ```

4. Pour publier tout le corpus sans relecture (démonstration seulement) :

   ```sql
   update public.periods set status = 'valide';
   update public.terms set status = 'valide';
   update public.directors set status = 'valide';
   update public.questions set status = 'valide';
   ```

## Tests

```bash
supabase/tests/run.sh
```

Le script crée une base jetable `clubcine_test` sur le Postgres local, applique schéma et seed, puis vérifie 36 cas d'accès. `tests/00_stub_auth.sql` imite le schéma `auth` de Supabase et ne doit jamais être exécuté sur un vrai projet.

## Reste à décider

Ces points dépendent de l'entretien avec l'enseignant·e (voir `docs/discovery.md`, section 9) :

- **Connexion des élèves** : e-mail, ou comptes sans e-mail créés par l'enseignant·e. Le schéma ne stocke qu'un prénom ou pseudonyme dans les deux cas.
- **Sens des niveaux** : difficulté libre (choix actuel) ou seconde / première / terminale.
- **Contenus par classe** : aujourd'hui communs à toutes les classes.
