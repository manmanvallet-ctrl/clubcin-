import { useState, type ChangeEvent, type FormEvent } from 'react'
import { STUDENTS } from '../data/demo'
import { lienSur, rechercheYoutube, type Media } from '../data/medias'
import { reduire } from '../lib/image'
import { useStore } from '../store'

export const auteur = (m: Media) => STUDENTS.find((s) => s.id === m.by)?.name ?? 'Un élève'

// Liens d'extraits et images attachés à un contenu.
// L'enseignant publie directement ; un élève propose un lien, visible de tous une fois validé.
export function Illustrations({ cle, recherche }: { cle: string; recherche?: string }) {
  const { session, medias, addMedia, removeMedia, validerMedia } = useStore()
  const teacher = session?.role === 'enseignant'
  const moi = session?.role === 'eleve' ? session.studentId : undefined
  const all = medias[cle] ?? []
  // Un élève ne voit que ce qui est validé, plus ses propres propositions en attente.
  const list = all.filter((m) => m.status !== 'propose' || teacher || m.by === moi)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [erreur, setErreur] = useState('')
  const [grande, setGrande] = useState<string | null>(null)
  const liens = list.filter((m) => m.kind === 'lien')
  const images = list.filter((m) => m.kind === 'image')

  const ajouterLien = (e: FormEvent) => {
    e.preventDefault()
    const sur = lienSur(url)
    if (!sur) return setErreur('Collez une adresse complète commençant par https://')
    if (!teacher && !title.trim()) return setErreur('Donne un titre : quel film, quelle scène ?')
    addMedia(cle, {
      kind: 'lien',
      title: title.trim() || new URL(sur).hostname.replace(/^www\./, ''),
      url: sur,
      status: teacher ? 'valide' : 'propose',
      by: moi,
    })
    setTitle('')
    setUrl('')
    setErreur('')
    if (!teacher) setOpen(false)
  }
  const ajouterImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      addMedia(cle, { kind: 'image', title: title.trim() || file.name.replace(/\.[^.]+$/, ''), src: await reduire(file, 960), status: 'valide' })
      setTitle('')
      setErreur('')
    } catch {
      setErreur('Cette image n’a pas pu être lue. Essayez avec un fichier JPEG ou PNG.')
    }
  }

  return (
    <div className="illus">
      {images.length > 0 && (
        <ul className="illus-images">
          {images.map((m) => (
            <li key={m.id} className={grande === m.id ? 'grande' : ''}>
              <button className="photo" onClick={() => setGrande(grande === m.id ? null : m.id)} aria-label={`${grande === m.id ? 'Réduire' : 'Agrandir'} : ${m.title}`}>
                <img src={m.src} alt={m.title} />
              </button>
              <span className="muted">{m.title}</span>
              {teacher && (
                <button className="link" onClick={() => removeMedia(cle, m.id)}>
                  Retirer
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <ul className="illus-liens">
        {liens.map((m) => {
          const attente = m.status === 'propose'
          return (
            <li key={m.id} className={attente ? 'attente' : ''}>
              <a href={m.url} target="_blank" rel="noopener noreferrer">
                ▶ {m.title}
              </a>
              {attente && <span className="tag">{teacher ? `Proposé par ${auteur(m)}` : 'En attente de validation'}</span>}
              {attente && teacher && (
                <button className="link ok" onClick={() => validerMedia(cle, m.id)} aria-label={`Valider ${m.title}`}>
                  Valider
                </button>
              )}
              {(teacher || (attente && m.by === moi)) && (
                <button className="link" onClick={() => removeMedia(cle, m.id)} aria-label={`${attente && teacher ? 'Refuser' : 'Retirer'} ${m.title}`}>
                  {attente && teacher ? 'Refuser' : 'Retirer'}
                </button>
              )}
            </li>
          )
        })}
        {recherche && (
          <li>
            <a className="muted" href={rechercheYoutube(recherche)} target="_blank" rel="noopener noreferrer">
              Chercher des extraits sur YouTube
            </a>
          </li>
        )}
      </ul>
      {open ? (
        <form className="illus-form" onSubmit={ajouterLien}>
          <input id={`titre-${cle}`} aria-label="Titre" placeholder={teacher ? 'Titre (facultatif)' : 'Quel film, quelle scène ?'} value={title} onChange={(e) => setTitle(e.target.value)} />
          <input id={`url-${cle}`} aria-label="Adresse du lien" type="url" inputMode="url" placeholder="https://… lien vers un extrait" value={url} onChange={(e) => setUrl(e.target.value)} />
          <div className="illus-actions">
            <button className="primary" type="submit">
              {teacher ? 'Ajouter le lien' : 'Proposer'}
            </button>
            {teacher && (
              <label className="button">
                Ajouter une image
                <input id={`image-${cle}`} className="sr" type="file" accept="image/*" onChange={ajouterImage} />
              </label>
            )}
            <button className="link" type="button" onClick={() => { setOpen(false); setErreur('') }}>
              Fermer
            </button>
          </div>
          {!teacher && <small className="muted">Ton enseignant le verra avant les autres élèves.</small>}
          {erreur && <small className="ko">{erreur}</small>}
        </form>
      ) : (
        <button className="link" onClick={() => setOpen(true)}>
          {teacher ? '+ Ajouter un extrait ou une image' : '+ Proposer un extrait'}
        </button>
      )}
    </div>
  )
}
