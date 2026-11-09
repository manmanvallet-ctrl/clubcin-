import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DIRECTORS, LEVELS, PERIODS, QUESTIONS, TERMS, type Level } from '../data/content'
import type { Progress } from '../data/demo'
import { Illustrations } from '../components/Illustrations'
import { useStore } from '../store'

export const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0)

export function summary(p: Progress) {
  return {
    histoire: pct(p.periods.length, PERIODS.length),
    vocabulaire: pct(p.terms.length, TERMS.length),
    realisateurs: pct(p.directors.length, DIRECTORS.length),
  }
}

export function Bar({ value }: { value: number }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

const LevelTag = ({ level }: { level: Level }) => (
  <span className={`tag l${level}`}>{LEVELS[level - 1].label}</span>
)

function DoneButton({ done, onClick, labels }: { done: boolean; onClick: () => void; labels: [string, string] }) {
  const { session } = useStore()
  if (session?.role !== 'eleve') return null
  return (
    <button className={done ? 'done' : ''} onClick={onClick}>
      {done ? `✓ ${labels[1]}` : labels[0]}
    </button>
  )
}

export function CultureAccueil() {
  const { me, level } = useStore()
  const s = summary(me)
  const nextPeriod = PERIODS.find((p) => p.level <= level && !me.periods.includes(p.id))
  const tiles: [string, string, number, string][] = [
    ['/culture/histoire', 'Histoire du cinéma', s.histoire, `${me.periods.length}/${PERIODS.length} périodes lues`],
    ['/culture/vocabulaire', 'Vocabulaire', s.vocabulaire, `${me.terms.length}/${TERMS.length} notions maîtrisées`],
    ['/culture/realisateurs', 'Réalisateurs', s.realisateurs, `${me.directors.length}/${DIRECTORS.length} fiches lues`],
  ]
  return (
    <>
      <h1>Culture ciné</h1>
      <p className="lead">Niveau en cours : {LEVELS[level - 1].label}. Voici où tu en es.</p>
      <div className="grid three">
        {tiles.map(([to, title, value, detail]) => (
          <Link key={to} to={to} className="card tile">
            <h2>{title}</h2>
            <div className="big">{value} %</div>
            <Bar value={value} />
            <p className="muted">{detail}</p>
          </Link>
        ))}
      </div>
      <div className="grid two">
        <section className="card">
          <h2>À faire ensuite</h2>
          {nextPeriod ? (
            <p>
              Lire la période <Link to="/culture/histoire">« {nextPeriod.title} »</Link> ({nextPeriod.years}).
            </p>
          ) : (
            <p>Toutes les périodes de ton niveau sont lues. Passe au niveau suivant ou tente le quiz.</p>
          )}
          <p>
            <Link to="/culture/quiz">Lancer un quiz</Link>
          </p>
        </section>
        <section className="card">
          <h2>Quiz</h2>
          <ul className="plain">
            {LEVELS.map((l) => (
              <li key={l.id}>
                <span>{l.label}</span>
                <strong>{me.quiz[l.id] !== undefined ? `${me.quiz[l.id]} %` : '—'}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export function Histoire() {
  const { level, me, toggle } = useStore()
  const [open, setOpen] = useState<string | null>(PERIODS[0].id)
  return (
    <>
      <h1>Histoire du cinéma</h1>
      <p className="lead">Une frise en huit périodes. Les périodes au-dessus de ton niveau restent consultables.</p>
      <ol className="timeline">
        {PERIODS.map((p) => {
          const read = me.periods.includes(p.id)
          const isOpen = open === p.id
          return (
            <li key={p.id} className={`${read ? 'read' : ''} ${p.level > level ? 'above' : ''}`}>
              <button className="period" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : p.id)}>
                <span className="years">{p.years}</span>
                <span className="ptitle">{p.title}</span>
                <LevelTag level={p.level} />
              </button>
              {isOpen && (
                <div className="card">
                  <p>{p.summary}</p>
                  <h3>À retenir</h3>
                  <ul>
                    {p.keyPoints.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                  <h3>Films repères</h3>
                  <ul>
                    {p.films.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Illustrations cle={`period:${p.id}`} />
                  <DoneButton done={read} onClick={() => toggle('periods', p.id)} labels={['Marquer comme lu', 'Lu']} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </>
  )
}

export function Vocabulaire() {
  const { level, me, toggle } = useStore()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Toutes')
  const cats = ['Toutes', ...new Set(TERMS.map((t) => t.category))]
  const list = TERMS.filter(
    (t) =>
      t.level <= level &&
      (cat === 'Toutes' || t.category === cat) &&
      (t.term + t.definition).toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <>
      <h1>Vocabulaire du cinéma</h1>
      <p className="lead">
        {list.length} notions affichées pour le niveau {LEVELS[level - 1].label} et en dessous.
      </p>
      <div className="filters">
        <input type="search" placeholder="Rechercher une notion…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="chips">
          {cats.map((c) => (
            <button key={c} className={c === cat ? 'active' : ''} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid three">
        {list.map((t) => (
          <article key={t.id} className="card">
            <div className="row">
              <span className="muted">{t.category}</span>
              <LevelTag level={t.level} />
            </div>
            <h2>{t.term}</h2>
            <p>{t.definition}</p>
            {t.example && <p className="muted">Exemple : {t.example}</p>}
            <Illustrations cle={`term:${t.id}`} recherche={`${t.term} cinéma exemple`} />
            <DoneButton done={me.terms.includes(t.id)} onClick={() => toggle('terms', t.id)} labels={['Je maîtrise', 'Maîtrisé']} />
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="muted">Aucune notion ne correspond à cette recherche.</p>}
    </>
  )
}

export function Realisateurs() {
  const { level, me, toggle } = useStore()
  const list = DIRECTORS.filter((d) => d.level <= level)
  return (
    <>
      <h1>Réalisatrices et réalisateurs</h1>
      <p className="lead">
        {list.length} fiches sur {DIRECTORS.length} disponibles à ce niveau.
      </p>
      <div className="grid two">
        {list.map((d) => (
          <article key={d.id} className="card">
            <div className="row">
              <span className="muted">
                {d.dates} · {d.country}
              </span>
              <LevelTag level={d.level} />
            </div>
            <h2>{d.name}</h2>
            <p>{d.bio}</p>
            <h3>Style</h3>
            <div className="chips static">
              {d.style.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h3>À voir</h3>
            <p>{d.films.join(' · ')}</p>
            <Illustrations cle={`director:${d.id}`} recherche={`${d.name} extrait`} />
            <DoneButton done={me.directors.includes(d.id)} onClick={() => toggle('directors', d.id)} labels={['Marquer comme lue', 'Fiche lue']} />
          </article>
        ))}
      </div>
    </>
  )
}

export function Quiz() {
  const { level, saveQuiz, me } = useStore()
  const questions = QUESTIONS.filter((q) => q.level === level)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [good, setGood] = useState(0)
  const [activeLevel, setActiveLevel] = useState(level)

  // Changement de niveau en cours de quiz : on repart de zéro.
  if (activeLevel !== level) {
    setActiveLevel(level)
    setI(0)
    setPicked(null)
    setGood(0)
  }

  const q = questions[i]
  const finished = i >= questions.length
  const score = pct(good, questions.length)

  const next = () => {
    if (i + 1 >= questions.length) saveQuiz(level, score)
    setI(i + 1)
    setPicked(null)
  }
  const restart = () => {
    setI(0)
    setPicked(null)
    setGood(0)
  }

  return (
    <>
      <h1>Quiz · {LEVELS[level - 1].label}</h1>
      <p className="lead">
        Meilleur score : {me.quiz[level] !== undefined ? `${me.quiz[level]} %` : 'pas encore tenté'}. Change de niveau
        avec le sélecteur ci-dessus.
      </p>
      {finished ? (
        <section className="card quiz">
          <div className="big">{score} %</div>
          <p>
            {good} bonne{good > 1 ? 's' : ''} réponse{good > 1 ? 's' : ''} sur {questions.length}.
          </p>
          <button className="primary" onClick={restart}>
            Recommencer
          </button>
        </section>
      ) : (
        <section className="card quiz">
          <p className="muted">
            Question {i + 1}/{questions.length} · {q.theme}
          </p>
          <h2>{q.question}</h2>
          <div className="choices">
            {q.choices.map((c, idx) => {
              const state = picked === null ? '' : idx === q.answer ? 'right' : idx === picked ? 'wrong' : ''
              return (
                <button
                  key={c}
                  className={state}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(idx)
                    if (idx === q.answer) setGood(good + 1)
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <>
              <p className={picked === q.answer ? 'ok' : 'ko'}>
                {picked === q.answer ? 'Bonne réponse.' : 'Ce n’est pas ça.'} {q.explanation}
              </p>
              <button className="primary" onClick={next}>
                {i + 1 >= questions.length ? 'Voir le résultat' : 'Question suivante'}
              </button>
            </>
          )}
        </section>
      )}
    </>
  )
}
