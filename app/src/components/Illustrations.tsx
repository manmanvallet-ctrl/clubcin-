import { useState, type ChangeEvent, type FormEvent } from 'react'
import { lienSur, rechercheYoutube } from '../data/medias'
import { reduire } from '../lib/image'
import { useStore } from '../store'

// Liens d'extraits et images attachés à un contenu. Tout le monde les voit ; l'enseignant en ajoute.
export function Illustrations({ cle, recherche }: { cle: string; recherche?: string }) {
  const { session, medias, addMedia, removeMedia } = useStore()
  const teacher = session?.role === 'enseignant'
  const list = medias[cle] ?? []
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
    addMedia(cle, { kind: 'lien', title: title.trim() || new URL(sur).hostname.replace(/^www\./, ''), url: sur })
    setTitle('')
    setUrl('')
    setErreur('')
  }
  const ajouterImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      addMedia(cle, { kind: 'image', title: title.trim() || file.name.replace(/\.[^.]+$/, ''), src: await reduire(file, 960) })
      setTitle('')
      setErreur('')
    } catch {
      setErreur('Cette image n’a pas pu être lue. Essayez avec un fichier JPEG ou PNG.')
    }
  }

  if (!teacher && list.length === 0 && !recherche) return null

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
        {liens.map((m) => (
          <li key={m.id}>
            <a href={m.url} target="_blank" rel="noopener noreferrer">
              ▶ {m.title}
            </a>
            {teacher && (
              <button className="link" onClick={() => removeMedia(cle, m.id)} aria-label={`Retirer le lien ${m.title}`}>
                Retirer
              </button>
            )}
          </li>
        ))}
        {recherche && (
          <li>
            <a className="muted" href={rechercheYoutube(recherche)} target="_blank" rel="noopener noreferrer">
              Chercher des extraits sur YouTube
            </a>
          </li>
        )}
      </ul>
      {teacher &&
        (open ? (
          <form className="illus-form" onSubmit={ajouterLien}>
            <input id={`titre-${cle}`} aria-label="Titre" placeholder="Titre (facultatif)" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input id={`url-${cle}`} aria-label="Adresse du lien" type="url" inputMode="url" placeholder="https://… lien vers un extrait" value={url} onChange={(e) => setUrl(e.target.value)} />
            <div className="illus-actions">
              <button className="primary" type="submit">
                Ajouter le lien
              </button>
              <label className="button">
                Ajouter une image
                <input id={`image-${cle}`} className="sr" type="file" accept="image/*" onChange={ajouterImage} />
              </label>
              <button className="link" type="button" onClick={() => { setOpen(false); setErreur('') }}>
                Fermer
              </button>
            </div>
            {erreur && <small className="ko">{erreur}</small>}
          </form>
        ) : (
          <button className="link" onClick={() => setOpen(true)}>
            + Ajouter un extrait ou une image
          </button>
        ))}
    </div>
  )
}
