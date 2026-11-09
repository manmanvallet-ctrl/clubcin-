#!/usr/bin/env bash
# Applique le schéma et le seed sur une base Postgres jetable, puis lance les tests RLS.
# Usage : supabase/tests/run.sh [chaîne de connexion superutilisateur]   (défaut : postgres local)
set -euo pipefail
cd "$(dirname "$0")/.."

ADMIN="${1:-postgresql:///postgres}"
DB="clubcine_test"
URL="${ADMIN%/*}/$DB"

psql "$ADMIN" -qc "drop database if exists $DB" -c "create database $DB"
psql "$ADMIN" -qc "drop role if exists anon" -c "drop role if exists authenticated"

run() { psql "$URL" -q -v ON_ERROR_STOP=1 -f "$1"; }
run tests/00_stub_auth.sql
for f in migrations/*.sql; do run "$f"; done
run seed.sql
psql "$URL" -qAt -f tests/rls.sql 2>&1 | sed -n "s/^.*NOTICE:  //p; /ERROR\|ÉCHEC\|Tous les tests/p"
