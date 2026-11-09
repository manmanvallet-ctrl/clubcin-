import { GROUPS, PROJECTS, STEPS, STUDENTS } from '../data/demo'
import { useStore } from '../store'
import { Bar, pct } from './Eleve'

const date = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function Projets() {
  const { session, steps, toggleStep } = useStore()
  const student = session?.role === 'eleve' ? STUDENTS.find((s) => s.id === session.studentId) : null
  const projects = student ? PROJECTS.filter((p) => p.groupId === student.groupId) : PROJECTS

  return (
    <>
      <h1>{student ? 'Le projet de mon groupe' : 'Projets des groupes'}</h1>
      <p className="lead">
        {student
          ? 'Cochez les étapes au fur et à mesure : toute l’équipe et l’enseignant·e voient l’avancement.'
          : 'Avancement de chaque groupe, étape par étape.'}
      </p>
      <div className={student ? '' : 'grid two'}>
        {projects.map((p) => {
          const done = steps[p.id] ?? []
          const group = GROUPS.find((g) => g.id === p.groupId)
          const members = STUDENTS.filter((s) => s.groupId === p.groupId)
          return (
            <article key={p.id} className="card">
              <div className="row">
                <span className="muted">
                  {group?.name} · {p.kind}
                </span>
                <span className="muted">Rendu le {date(p.due)}</span>
              </div>
              <h2>{p.title}</h2>
              <p>{p.pitch}</p>
              <p className="muted">Équipe : {members.map((m) => m.name).join(', ')}</p>
              <Bar value={pct(done.length, STEPS.length)} />
              <ul className="steps">
                {STEPS.map((s) => (
                  <li key={s.id}>
                    <label>
                      <input type="checkbox" checked={done.includes(s.id)} onChange={() => toggleStep(p.id, s.id)} />
                      {s.label}
                    </label>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </>
  )
}
