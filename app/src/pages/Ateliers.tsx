import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ATELIERS, ETAPES, avancement, carnetId, type Atelier, type Carnet } from '../data/ateliers'
import { TERMS } from '../data/content'
import { GROUPS, STUDENTS } from '../data/demo'
import { useStore } from '../store'

function useMyGroup() {
  const { session } = useStore()
  const student = session?.role === 'eleve' ? STUDENTS.find((s) => s.id === session.studentId) : undefined
  return { student, group: GROUPS.find((g) => g.id === student?.groupId) }
}

// Pastilles d'avancement : une par étape du carnet.
export function Etapes({ carnet }: { carnet: Carnet }) {
  return (
    <ol className="etapes" aria-label={`${avancement(carnet)} étapes sur ${ETAPES.length} terminées`}>
      {ETAPES.map((e) => (
        <li key={e.id} className={e.done(carnet) ? 'ok' : ''}>
          {e.label}
        </li>
      ))}
    </ol>
  )
}

function prochaine(carnet: Carnet) {
  return ETAPES.find((e) => !e.done(carnet))?.label ?? 'Terminé'
}

function CarnetCard({ id, showGroup }: { id: string; showGroup?: boolean }) {
  const { carnets } = useStore()
  const [atelierId, groupId] = id.split('--')
  const atelier = ATELIERS.find((a) => a.id === atelierId)
  const carnet = carnets[id]
  if (!atelier || !carnet) return null
  const group = GROUPS.find((g) => g.id === groupId)
  const members = STUDENTS.filter((s) => s.groupId === groupId).map((s) => s.name)
  return (
    <Link to={`/carnet/${id}`} className="card tile">
      <div className="row">
        <span className="muted">{showGroup ? `${group?.name} · ${members.join(', ')}` : atelier.kind}</span>
        <span className="muted">
          {avancement(carnet)}/{ETAPES.length}
        </span>
      </div>
      <h2>{atelier.title}</h2>
      <Etapes carnet={carnet} />
      <p className="muted">À faire : {prochaine(carnet)}</p>
    </Link>
  )
}

export function AccueilEleve() {
  const { carnets } = useStore()
  const { student, group } = useMyGroup()
  const mine = Object.keys(carnets).filter((id) => id.endsWith(`--${group?.id}`))
  return (
    <>
      <h1>Bonjour {student?.name}</h1>
      <p className="lead">
        {group?.name}. {mine.length ? 'Reprenez votre carnet là où le groupe s’est arrêté.' : 'Aucun atelier en cours pour ton groupe.'}
      </p>
      <div className="grid two">
        {mine.map((id) => (
          <CarnetCard key={id} id={id} />
        ))}
      </div>
      <p>
        <Link to="/ateliers">Voir tous les ateliers</Link> · <Link to="/culture">Culture ciné</Link>
      </p>
    </>
  )
}

export function Carnets() {
  const { carnets } = useStore()
  const ids = Object.keys(carnets)
  return (
    <>
      <h1>Carnets des groupes</h1>
      <p className="lead">Où en est chaque groupe. Ouvrez un carnet pour lire ou écrire avec les élèves.</p>
      {GROUPS.map((g) => {
        const mine = ids.filter((id) => id.endsWith(`--${g.id}`))
        return (
          <section key={g.id} className="block">
            <h3>{g.name}</h3>
            {mine.length ? (
              <div className="grid two">
                {mine.map((id) => (
                  <CarnetCard key={id} id={id} showGroup />
                ))}
              </div>
            ) : (
              <p className="muted">
                Aucun atelier lancé. <Link to="/">Choisir un atelier</Link>
              </p>
            )}
          </section>
        )
      })}
    </>
  )
}

function AtelierCard({ atelier }: { atelier: Atelier }) {
  const { session, carnets, lancer } = useStore()
  const { group } = useMyGroup()
  const navigate = useNavigate()
  const teacher = session?.role === 'enseignant'
  const [groupId, setGroupId] = useState(GROUPS[0].id)
  const target = teacher ? groupId : group?.id
  const existing = target ? carnets[carnetId(atelier.id, target)] : undefined
  const notions = TERMS.filter((t) => atelier.notions.includes(t.id))

  return (
    <article className="card atelier">
      <div className="row">
        <span className="muted">{atelier.kind}</span>
        <span className="tag">{atelier.duration}</span>
      </div>
      <h2>{atelier.title}</h2>
      <p>{atelier.consigne}</p>
      <h3>Contraintes</h3>
      <ul>
        {atelier.contraintes.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {atelier.references.length > 0 && (
        <>
          <h3>À regarder avant</h3>
          <ul>
            {atelier.references.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      )}
      <h3>Notions travaillées</h3>
      <div className="notions">
        {notions.map((t) => (
          <details key={t.id}>
            <summary>{t.term}</summary>
            <p>{t.definition}</p>
          </details>
        ))}
      </div>
      <div className="actions">
        {teacher && (
          <label>
            <span className="sr">Groupe</span>
            <select id={`groupe-${atelier.id}`} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
              {GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {existing ? (
          <Link className="button" to={`/carnet/${carnetId(atelier.id, target!)}`}>
            Ouvrir le carnet
          </Link>
        ) : teacher ? (
          <button className="primary" onClick={() => navigate(`/carnet/${lancer(atelier.id, groupId)}`)}>
            Lancer l’atelier
          </button>
        ) : (
          <span className="muted">Pas encore lancé pour ton groupe.</span>
        )}
      </div>
    </article>
  )
}

export function Ateliers() {
  const { session } = useStore()
  return (
    <>
      <h1>Ateliers</h1>
      <p className="lead">
        {session?.role === 'enseignant'
          ? 'Des exercices à contrainte, prêts pour une séance. Lancez-en un pour un groupe : son carnet de création s’ouvre.'
          : 'Les exercices du club. Ceux que ton groupe a commencés ouvrent directement sur votre carnet.'}
      </p>
      <div className="grid two">
        {ATELIERS.map((a) => (
          <AtelierCard key={a.id} atelier={a} />
        ))}
      </div>
    </>
  )
}
