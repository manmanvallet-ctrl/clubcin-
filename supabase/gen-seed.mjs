// Génère supabase/seed.sql à partir du corpus du prototype (app/src/data/content.ts).
// Usage : node supabase/gen-seed.mjs   (Node 22.18 ou plus récent)
import { writeFileSync } from 'node:fs'
import { DIRECTORS, PERIODS, QUESTIONS, TERMS } from '../app/src/data/content.ts'

const str = (v) => (v == null ? 'null' : `'${String(v).replaceAll("'", "''")}'`)
const arr = (a) => (a.length ? `array[${a.map(str).join(', ')}]` : `'{}'::text[]`)

function insert(table, columns, rows) {
  const values = rows.map((r) => `  (${r.join(', ')})`).join(',\n')
  // « do nothing » : relancer le seed n'écrase jamais les corrections de l'enseignant·e.
  return `insert into public.${table} (${columns.join(', ')}) values\n${values}\non conflict (id) do nothing;\n`
}

const sql = [
  '-- Fichier généré par supabase/gen-seed.mjs — ne pas modifier à la main.',
  "-- Corpus rédigé par IA : tout est inséré avec le statut « a_relire », donc invisible des élèves",
  "-- tant que l'enseignant·e ne l'a pas validé.\n",
  insert(
    'periods',
    ['id', 'position', 'title', 'years', 'level', 'summary', 'key_points', 'films'],
    PERIODS.map((p, i) => [str(p.id), i + 1, str(p.title), str(p.years), p.level, str(p.summary), arr(p.keyPoints), arr(p.films)]),
  ),
  insert(
    'terms',
    ['id', 'term', 'category', 'level', 'definition', 'example'],
    TERMS.map((t) => [str(t.id), str(t.term), str(t.category), t.level, str(t.definition), str(t.example)]),
  ),
  insert(
    'directors',
    ['id', 'name', 'dates', 'country', 'level', 'bio', 'style', 'films'],
    DIRECTORS.map((d) => [str(d.id), str(d.name), str(d.dates), str(d.country), d.level, str(d.bio), arr(d.style), arr(d.films)]),
  ),
  insert(
    'questions',
    ['id', 'level', 'theme', 'question', 'choices', 'answer', 'explanation'],
    QUESTIONS.map((q) => [str(q.id), q.level, str(q.theme), str(q.question), arr(q.choices), q.answer, str(q.explanation)]),
  ),
].join('\n')

writeFileSync(new URL('./seed.sql', import.meta.url), sql)
console.log(`seed.sql : ${PERIODS.length} périodes, ${TERMS.length} notions, ${DIRECTORS.length} cinéastes, ${QUESTIONS.length} questions`)
