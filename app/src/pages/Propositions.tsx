import { auteur } from '../components/Illustrations'
import { ATELIERS } from '../data/ateliers'
import { DIRECTORS, PERIODS, TERMS } from '../data/content'
import type { Media } from '../data/medias'
import { useStore } from '../store'

// « term:plan » → « Vocabulaire · Plan »
function libelle(cle: string) {
  const [type, id] = cle.split(':')
  if (type === 'term') return `Vocabulaire · ${TERMS.find((t) => t.id === id)?.term ?? id}`
  if (type === 'period') return `Histoire · ${PERIODS.find((p) => p.id === id)?.title ?? id}`
  if (type === 'director') return `Cinéastes · ${DIRECTORS.find((d) => d.id === id)?.name ?? id}`
  return `Atelier · ${ATELIERS.find((a) => a.id === id)?.title ?? id}`
}

// eslint-disable-next-line react-refresh/only-export-components
export function enAttente(medias: Record<string, Media[]>) {
  return Object.entries(medias).flatMap(([cle, list]) => list.filter((m) => m.status === 'propose').map((m) => ({ cle, m })))
}

export function Propositions() {
  const { medias, validerMedia, removeMedia } = useStore()
  const list = enAttente(medias)
  return (
    <>
      <h1>Propositions des élèves</h1>
      <p className="lead">
        Les extraits proposés par les élèves. Ouvrez le lien pour vérifier, puis validez : il devient visible de tout le
        club. Un refus le supprime.
      </p>
      {list.length === 0 ? (
        <p className="muted">Rien à valider pour l’instant.</p>
      ) : (
        <ul className="propositions">
          {list.map(({ cle, m }) => (
            <li key={m.id} className="card">
              <div className="row">
                <span className="muted">{libelle(cle)}</span>
                <span className="tag">Proposé par {auteur(m)}</span>
              </div>
              <h2>{m.title}</h2>
              <p>
                <a href={m.url} target="_blank" rel="noopener noreferrer">
                  {m.url}
                </a>
              </p>
              <div className="illus-actions">
                <button className="primary" onClick={() => validerMedia(cle, m.id)}>
                  Valider
                </button>
                <button onClick={() => removeMedia(cle, m.id)}>Refuser</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
