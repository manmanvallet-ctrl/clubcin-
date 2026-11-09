import { useState } from 'react'
import { LEVELS } from '../data/content'
import { GROUPS, PROJECTS, STEPS, STUDENTS, emptyProgress } from '../data/demo'
import { useStore } from '../store'
import { Bar, pct, summary } from './Eleve'

export function Suivi() {
  const { progress, steps } = useStore()
  const [group, setGroup] = useState('tous')
  const rows = STUDENTS.filter((s) => group === 'tous' || s.groupId === group).map((s) => {
    const p = progress[s.id] ?? emptyProgress()
    const sum = summary(p)
    return { s, p, sum, global: Math.round((sum.histoire + sum.vocabulaire + sum.realisateurs) / 3) }
  })
  const avg = rows.length ? Math.round(rows.reduce((a, r) => a + r.global, 0) / rows.length) : 0
  const late = rows.filter((r) => r.global < 30)

  return (
    <>
      <h1>Suivi de la classe</h1>
      <p className="lead">Progression individuelle par rubrique et avancement des projets de groupe.</p>
      <div className="grid three">
        <section className="card">
          <h2>Progression moyenne</h2>
          <div className="big">{avg} %</div>
          <Bar value={avg} />
        </section>
        <section className="card">
          <h2>À accompagner</h2>
          <div className="big">{late.length}</div>
          <p className="muted">{late.length ? late.map((r) => r.s.name).join(', ') : 'Personne sous 30 %.'}</p>
        </section>
        <section className="card">
          <h2>Projets</h2>
          <ul className="plain">
            {PROJECTS.map((p) => (
              <li key={p.id}>
                <span>{p.title}</span>
                <strong>
                  {(steps[p.id] ?? []).length}/{STEPS.length}
                </strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="chips">
        <button className={group === 'tous' ? 'active' : ''} onClick={() => setGroup('tous')}>
          Toute la classe
        </button>
        {GROUPS.map((g) => (
          <button key={g.id} className={group === g.id ? 'active' : ''} onClick={() => setGroup(g.id)}>
            {g.name}
          </button>
        ))}
      </div>

      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Élève</th>
              <th>Groupe</th>
              <th>Histoire</th>
              <th>Vocabulaire</th>
              <th>Réalisateurs</th>
              {LEVELS.map((l) => (
                <th key={l.id}>Quiz {l.label.toLowerCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, p, sum }) => (
              <tr key={s.id}>
                <th scope="row">{s.name}</th>
                <td className="muted">{GROUPS.find((g) => g.id === s.groupId)?.name.replace('Groupe ', '')}</td>
                {[sum.histoire, sum.vocabulaire, sum.realisateurs].map((v, i) => (
                  <td key={i}>
                    <div className="cell">
                      <Bar value={v} />
                      <span>{v} %</span>
                    </div>
                  </td>
                ))}
                {LEVELS.map((l) => (
                  <td key={l.id}>{p.quiz[l.id] !== undefined ? `${p.quiz[l.id]} %` : '—'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">
        {pct(rows.filter((r) => Object.keys(r.p.quiz).length > 0).length, rows.length)} % des élèves affichés ont tenté
        au moins un quiz.
      </p>
    </>
  )
}
