import { NavLink, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { LEVELS, type Level } from './data/content'
import { STUDENTS } from './data/demo'
import { useStore } from './store'
import { AccueilEleve, Ateliers, Carnets } from './pages/Ateliers'
import { CarnetPage } from './pages/Carnet'
import { CultureAccueil, Histoire, Quiz, Realisateurs, Vocabulaire } from './pages/Eleve'
import { Suivi } from './pages/Enseignant'

function Login() {
  const { login, reset } = useStore()
  return (
    <main className="login">
      <p className="eyebrow">Club cinéma · maquette</p>
      <h1>Club Ciné</h1>
      <p className="lead">
        Des ateliers à contrainte et un carnet de création pour écrire, storyboarder et tourner en groupe. Choisissez un
        profil de démonstration pour entrer.
      </p>
      <div className="grid two">
        <section className="card">
          <h2>Espace élève</h2>
          <p className="muted">Retrouver le carnet de son groupe et avancer dans la création.</p>
          <div className="chips">
            {STUDENTS.filter((_, i) => i % 3 === 0).map((s) => (
              <button key={s.id} onClick={() => login({ role: 'eleve', studentId: s.id })}>
                {s.name}
              </button>
            ))}
          </div>
        </section>
        <section className="card">
          <h2>Espace enseignant</h2>
          <p className="muted">Choisir un atelier, le lancer pour un groupe, suivre les carnets.</p>
          <button className="primary" onClick={() => login({ role: 'enseignant' })}>
            Entrer comme enseignant
          </button>
        </section>
      </div>
      <button className="link" onClick={reset}>
        Réinitialiser les données de démonstration
      </button>
    </main>
  )
}

// Histoire, vocabulaire, cinéastes et quiz : au second plan, derrière la création.
function Culture() {
  const { session, level, setLevel } = useStore()
  const tabs = [
    ['histoire', 'Histoire'],
    ['vocabulaire', 'Vocabulaire'],
    ['realisateurs', 'Cinéastes'],
    ...(session?.role === 'eleve' ? [['quiz', 'Quiz']] : []),
  ]
  return (
    <>
      <div className="subnav">
        <nav>
          {session?.role === 'eleve' && (
            <NavLink to="/culture" end>
              Vue d’ensemble
            </NavLink>
          )}
          {tabs.map(([to, label]) => (
            <NavLink key={to} to={`/culture/${to}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <label>
          <span className="sr">Niveau</span>
          <select id="niveau" value={level} onChange={(e) => setLevel(Number(e.target.value) as Level)}>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Outlet />
    </>
  )
}

export default function App() {
  const { session, login } = useStore()
  const navigate = useNavigate()
  if (!session) return <Login />

  const eleve = session.role === 'eleve'
  const name = eleve ? STUDENTS.find((s) => s.id === session.studentId)?.name : 'Enseignant'
  const links = eleve
    ? [
        ['/', 'Mon carnet'],
        ['/ateliers', 'Ateliers'],
        ['/culture', 'Culture ciné'],
      ]
    : [
        ['/', 'Ateliers'],
        ['/carnets', 'Carnets'],
        ['/culture', 'Culture ciné'],
        ['/suivi', 'Suivi'],
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
          <span className="muted">{name}</span>
          <button
            className="link"
            onClick={() => {
              navigate('/') // le prochain profil arrive sur son accueil, pas sur la page qu'on quitte
              login(null)
            }}
          >
            Quitter
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={eleve ? <AccueilEleve /> : <Ateliers />} />
          <Route path="/ateliers" element={<Ateliers />} />
          <Route path="/carnets" element={eleve ? <Navigate to="/" /> : <Carnets />} />
          <Route path="/carnet/:id" element={<CarnetPage />} />
          <Route path="/culture" element={<Culture />}>
            <Route index element={eleve ? <CultureAccueil /> : <Navigate to="/culture/histoire" replace />} />
            <Route path="histoire" element={<Histoire />} />
            <Route path="vocabulaire" element={<Vocabulaire />} />
            <Route path="realisateurs" element={<Realisateurs />} />
            <Route path="quiz" element={eleve ? <Quiz /> : <Navigate to="/culture/histoire" replace />} />
          </Route>
          <Route path="/suivi" element={eleve ? <Navigate to="/" /> : <Suivi />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
