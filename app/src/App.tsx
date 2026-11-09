import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { LEVELS, type Level } from './data/content'
import { STUDENTS } from './data/demo'
import { useStore } from './store'
import { Accueil, Histoire, Quiz, Realisateurs, Vocabulaire } from './pages/Eleve'
import { Projets } from './pages/Projets'
import { Suivi } from './pages/Enseignant'

function Login() {
  const { login, reset } = useStore()
  return (
    <main className="login">
      <p className="eyebrow">Option cinéma-audiovisuel · prototype</p>
      <h1>Club Ciné</h1>
      <p className="lead">
        Histoire du cinéma, vocabulaire, réalisateurs et suivi des projets de groupe. Choisissez un profil de
        démonstration pour entrer.
      </p>
      <div className="grid two">
        <section className="card">
          <h2>Espace élève</h2>
          <p className="muted">Apprendre en autonomie et suivre le projet de son groupe.</p>
          <div className="chips">
            {STUDENTS.slice(0, 4).map((s) => (
              <button key={s.id} onClick={() => login({ role: 'eleve', studentId: s.id })}>
                {s.name}
              </button>
            ))}
          </div>
        </section>
        <section className="card">
          <h2>Espace enseignant</h2>
          <p className="muted">Suivre la progression de la classe et l’avancement des projets.</p>
          <button className="primary" onClick={() => login({ role: 'enseignant' })}>
            Entrer comme enseignant·e
          </button>
        </section>
      </div>
      <button className="link" onClick={reset}>
        Réinitialiser les données de démonstration
      </button>
    </main>
  )
}

export default function App() {
  const { session, login, level, setLevel } = useStore()
  if (!session) return <Login />

  const eleve = session.role === 'eleve'
  const name = eleve ? STUDENTS.find((s) => s.id === session.studentId)?.name : 'Enseignant·e'
  const links = eleve
    ? [
        ['/', 'Accueil'],
        ['/histoire', 'Histoire'],
        ['/vocabulaire', 'Vocabulaire'],
        ['/realisateurs', 'Réalisateurs'],
        ['/quiz', 'Quiz'],
        ['/projets', 'Projet'],
      ]
    : [
        ['/', 'Suivi'],
        ['/projets', 'Projets'],
        ['/histoire', 'Histoire'],
        ['/vocabulaire', 'Vocabulaire'],
        ['/realisateurs', 'Réalisateurs'],
      ]

  return (
    <>
      <header className="top">
        <div className="brand">Club Ciné</div>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="who">
          <label>
            <span className="sr">Niveau</span>
            <select value={level} onChange={(e) => setLevel(Number(e.target.value) as Level)}>
              {LEVELS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <span className="muted">{name}</span>
          <button className="link" onClick={() => login(null)}>
            Quitter
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={eleve ? <Accueil /> : <Suivi />} />
          <Route path="/histoire" element={<Histoire />} />
          <Route path="/vocabulaire" element={<Vocabulaire />} />
          <Route path="/realisateurs" element={<Realisateurs />} />
          <Route path="/quiz" element={eleve ? <Quiz /> : <Navigate to="/" />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
