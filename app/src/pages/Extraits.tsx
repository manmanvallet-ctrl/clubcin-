import { Illustrations } from '../components/Illustrations'
import { SOURCE_EXTRAITS, THEMES } from '../data/extraits'
import { useStore } from '../store'

// La vidéothèque du club : les extraits choisis par l'enseignant, rangés par procédé ou par motif.
export function Extraits() {
  const { session, medias } = useStore()
  const teacher = session?.role === 'enseignant'
  return (
    <>
      <h1>Extraits</h1>
      <p className="lead">
        Des scènes rangées par procédé ou par motif.{' '}
        {teacher
          ? 'Reprises de votre tableau netboard. Vous pouvez en ajouter et en retirer ici.'
          : 'Tu peux en proposer d’autres sous chaque thème.'}{' '}
        <a href={SOURCE_EXTRAITS} target="_blank" rel="noopener noreferrer">
          Voir le tableau d’origine
        </a>
      </p>
      <nav className="chips" aria-label="Thèmes">
        {THEMES.map((t) => (
          <a key={t.id} className="button" href={`#theme-${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`theme-${t.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}>
            {t.title}
          </a>
        ))}
      </nav>
      <div className="grid two">
        {THEMES.map((t) => (
          <section key={t.id} id={`theme-${t.id}`} className="card theme">
            <div className="row">
              <h2>{t.title}</h2>
              <span className="muted">{(medias[`theme:${t.id}`] ?? []).filter((m) => m.status !== 'propose').length} extraits</span>
            </div>
            <Illustrations cle={`theme:${t.id}`} />
          </section>
        ))}
      </div>
    </>
  )
}
