import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ANGLES, ATELIERS, ECHELLES, ETAPES, MOUVEMENTS, REGISTRES, newPlan, youtubeUrl, type Carnet, type Plan,
} from '../data/ateliers'
import { GROUPS, STUDENTS } from '../data/demo'
import { useStore } from '../store'

// Croquis au doigt ou à la souris, comme au tableau. Trait clair sur fond sombre.
function Croquis({ value, onChange, label }: { value?: string; onChange: (v: string | undefined) => void; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current || !value || !ref.current) return
    loaded.current = true
    const img = new Image()
    img.onload = () => ref.current?.getContext('2d')?.drawImage(img, 0, 0)
    img.src = value
  }, [value])

  const point = (e: PointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget
    const r = c.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height] as const
  }
  const start = (e: PointerEvent<HTMLCanvasElement>) => {
    const ctx = e.currentTarget.getContext('2d')
    if (!ctx) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    loaded.current = true
    ctx.strokeStyle = '#f5efef'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(...point(e))
  }
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const ctx = e.currentTarget.getContext('2d')
    ctx?.lineTo(...point(e))
    ctx?.stroke()
  }
  const end = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    drawing.current = false
    onChange(e.currentTarget.toDataURL('image/png'))
  }
  const clear = () => {
    const c = ref.current
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)
    onChange(undefined)
  }

  return (
    <div className="croquis">
      <canvas
        ref={ref}
        width={480}
        height={270}
        aria-label={label}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
      />
      {!value && <span className="croquis-hint">Croquis (facultatif)</span>}
      {value && (
        <button className="link" onClick={clear}>
          Effacer
        </button>
      )}
    </div>
  )
}

const MAX_PHOTOS = 4

// Réduit la photo avant de la garder : un téléphone produit des images de plusieurs mégaoctets.
function reduire(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const k = Math.min(1, 1280 / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * k)
      c.height = Math.round(img.height * k)
      c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', 0.7))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('image illisible'))
    }
    img.src = url
  })
}

// Le storyboard se fait au tableau : on le photographie plutôt que de le redessiner.
function PhotosTableau({ photos, onChange }: { photos: string[]; onChange: (p: string[]) => void }) {
  const [erreur, setErreur] = useState('')
  const [grande, setGrande] = useState<number | null>(null)
  const reste = MAX_PHOTOS - photos.length

  const ajouter = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])].slice(0, reste)
    e.target.value = ''
    setErreur('')
    try {
      onChange([...photos, ...(await Promise.all(files.map(reduire)))])
    } catch {
      setErreur('Cette image n’a pas pu être lue. Essayez avec une photo au format JPEG ou PNG.')
    }
  }

  return (
    <div className="field">
      <span>Photos du tableau</span>
      {photos.length > 0 && (
        <ul className="photos">
          {photos.map((src, i) => (
            <li key={i} className={grande === i ? 'grande' : ''}>
              <button className="photo" onClick={() => setGrande(grande === i ? null : i)} aria-label={`${grande === i ? 'Réduire' : 'Agrandir'} la photo ${i + 1}`}>
                <img src={src} alt={`Photo du tableau ${i + 1}`} />
              </button>
              <button className="link" onClick={() => { setGrande(null); onChange(photos.filter((_, j) => j !== i)) }}>
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
      {reste > 0 ? (
        <label className="button upload">
          {photos.length ? 'Ajouter une photo' : 'Photographier le tableau'}
          <input id="photos-tableau" className="sr" type="file" accept="image/*" capture="environment" multiple onChange={ajouter} />
        </label>
      ) : (
        <small>{MAX_PHOTOS} photos au maximum. Retirez-en une pour en ajouter.</small>
      )}
      {erreur && <small className="ko">{erreur}</small>}
      <small>Cadrez le tableau seul : pas de visages d’élèves sur la photo.</small>
    </div>
  )
}

function Choix({ id, label, value, options, onChange }: {
  id: string
  label: string
  value: string
  options: { label: string; hint: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.label}>{o.label}</option>
        ))}
      </select>
      <small>{options.find((o) => o.label === value)?.hint}</small>
    </label>
  )
}

function Texte({ id, label, value, onChange, rows = 3, placeholder, mono }: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
  mono?: boolean
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea id={id} className={mono ? 'mono' : ''} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function CarnetPage() {
  const { id = '' } = useParams()
  const { carnets, updateCarnet } = useStore()
  const [atelierId, groupId] = id.split('--')
  const atelier = ATELIERS.find((a) => a.id === atelierId)
  const group = GROUPS.find((g) => g.id === groupId)
  const carnet = carnets[id]
  const [etape, setEtape] = useState(() => (carnet ? (ETAPES.find((e) => !e.done(carnet)) ?? ETAPES[0]).id : 'idee'))

  if (!atelier || !group || !carnet) {
    return (
      <>
        <h1>Carnet introuvable</h1>
        <p>
          <Link to="/">Retour</Link>
        </p>
      </>
    )
  }

  const set = (patch: Partial<Carnet>) => updateCarnet(id, patch)
  const setPlan = (planId: string, patch: Partial<Plan>) =>
    set({ plans: carnet.plans.map((p) => (p.id === planId ? { ...p, ...patch } : p)) })
  const movePlan = (i: number, d: -1 | 1) => {
    const plans = [...carnet.plans]
    ;[plans[i], plans[i + d]] = [plans[i + d], plans[i]]
    set({ plans })
  }
  const idx = ETAPES.findIndex((e) => e.id === etape)
  const members = STUDENTS.filter((s) => s.groupId === groupId).map((s) => s.name)
  const film = youtubeUrl(carnet.lien)
  const tournes = carnet.plans.filter((p) => p.tourne).length

  return (
    <>
      <p className="eyebrow">
        {group.name} · {members.join(', ')}
      </p>
      <h1>{atelier.title}</h1>
      <details className="consigne">
        <summary>Consigne et contraintes</summary>
        <p>{atelier.consigne}</p>
        <ul>
          {atelier.contraintes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </details>

      <nav className="stepper" aria-label="Étapes du carnet">
        {ETAPES.map((e, i) => (
          <button key={e.id} className={`${e.id === etape ? 'active' : ''} ${e.done(carnet) ? 'ok' : ''}`} aria-current={e.id === etape ? 'step' : undefined} onClick={() => setEtape(e.id)}>
            <span className="num">{e.done(carnet) ? '✓' : i + 1}</span>
            {e.label}
          </button>
        ))}
      </nav>

      <section className="card sheet">
        {etape === 'idee' && (
          <>
            <h2>L’idée</h2>
            <p className="muted">En deux ou trois phrases : que se passe-t-il, et qu’est-ce que le spectateur doit ressentir ?</p>
            <Texte id="idee" label="Notre idée" value={carnet.idee} onChange={(v) => set({ idee: v })} rows={4} placeholder="Pendant un contrôle, un grand fracas retentit dans le couloir…" />
            <div className="field">
              <span>Registre</span>
              <div className="chips">
                {REGISTRES.map((r) => (
                  <button key={r} className={carnet.registre === r ? 'active' : ''} onClick={() => set({ registre: carnet.registre === r ? '' : r })}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {etape === 'cadre' && (
          <>
            <h2>Cadre et personnages</h2>
            <p className="muted">Où et quand se passe la scène ? Qui est là, et que veut chacun ?</p>
            <Texte id="lieu" label="Lieu et moment" value={carnet.lieu} onChange={(v) => set({ lieu: v })} rows={2} placeholder="Une salle de classe, pendant la pause de midi." />
            <Texte id="personnages" label="Personnages (un par ligne)" value={carnet.personnages} onChange={(v) => set({ personnages: v })} rows={4} placeholder="Prénom, ce qui le ou la caractérise, ce qu’il ou elle veut." />
          </>
        )}

        {etape === 'scenario' && (
          <>
            <h2>Scénario</h2>
            <p className="muted">
              Décrivez ce qu’on voit et ce qu’on entend, au présent. Nom du personnage en majuscules avant chaque réplique.
            </p>
            <Texte id="scenario" label="Notre scène" value={carnet.scenario} onChange={(v) => set({ scenario: v })} rows={16} mono placeholder={'INT. SALLE DE CLASSE — JOUR\n\nSilence. Des stylos grattent le papier.\n\nMALO\nT’as entendu ?'} />
          </>
        )}

        {etape === 'storyboard' && (
          <>
            <h2>Storyboard</h2>
            <p className="muted">
              Photographiez le storyboard fait au tableau, puis listez les plans pour préparer le tournage. Le croquis de
              chaque plan est facultatif.
            </p>
            <PhotosTableau photos={carnet.photos ?? []} onChange={(photos) => set({ photos })} />
            <div className="field">
              <span>Liste des plans</span>
            </div>
            <ol className="plans">
              {carnet.plans.map((p, i) => (
                <li key={p.id} className="plan">
                  <div className="plan-head">
                    <strong>Plan {i + 1}</strong>
                    <span>
                      <button className="link" disabled={i === 0} onClick={() => movePlan(i, -1)} aria-label={`Monter le plan ${i + 1}`}>↑</button>
                      <button className="link" disabled={i === carnet.plans.length - 1} onClick={() => movePlan(i, 1)} aria-label={`Descendre le plan ${i + 1}`}>↓</button>
                      <button className="link" onClick={() => set({ plans: carnet.plans.filter((x) => x.id !== p.id) })}>Supprimer</button>
                    </span>
                  </div>
                  <div className="plan-body">
                    <Croquis label={`Croquis du plan ${i + 1}`} value={p.croquis} onChange={(v) => setPlan(p.id, { croquis: v })} />
                    <div className="plan-fields">
                      <Texte id={`action-${p.id}`} label="Ce qu’on voit" value={p.action} onChange={(v) => setPlan(p.id, { action: v })} rows={2} />
                      <div className="trio">
                        <Choix id={`echelle-${p.id}`} label="Échelle" value={p.echelle} options={ECHELLES} onChange={(v) => setPlan(p.id, { echelle: v })} />
                        <Choix id={`angle-${p.id}`} label="Angle" value={p.angle} options={ANGLES} onChange={(v) => setPlan(p.id, { angle: v })} />
                        <Choix id={`mouvement-${p.id}`} label="Mouvement" value={p.mouvement} options={MOUVEMENTS} onChange={(v) => setPlan(p.id, { mouvement: v })} />
                      </div>
                      <Texte id={`son-${p.id}`} label="Ce qu’on entend" value={p.son} onChange={(v) => setPlan(p.id, { son: v })} rows={1} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <button className="primary" onClick={() => set({ plans: [...carnet.plans, newPlan()] })}>
              Ajouter un plan
            </button>
          </>
        )}

        {etape === 'tournage' && (
          <>
            <h2>Tournage</h2>
            <Texte id="roles" label="Qui fait quoi" value={carnet.roles} onChange={(v) => set({ roles: v })} rows={4} placeholder={'Réalisation :\nCadre :\nSon :\nJeu :'} />
            <div className="field">
              <span>
                Plans tournés : {tournes}/{carnet.plans.length}
              </span>
              {carnet.plans.length === 0 ? (
                <p className="muted">Le storyboard est vide : ajoutez d’abord des plans.</p>
              ) : (
                <ul className="steps">
                  {carnet.plans.map((p, i) => (
                    <li key={p.id}>
                      <label>
                        <input type="checkbox" id={`tourne-${p.id}`} checked={p.tourne} onChange={() => setPlan(p.id, { tourne: !p.tourne })} />
                        <span>
                          <strong>Plan {i + 1}</strong> · {p.echelle.toLowerCase()}, {p.mouvement.toLowerCase()}
                          <br />
                          <span className="muted">{p.action || 'Sans description'}</span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {etape === 'film' && (
          <>
            <h2>Le film</h2>
            <p className="muted">Collez le lien YouTube du film monté. La vidéo reste sur YouTube.</p>
            <label className="field">
              <span>Lien YouTube</span>
              <input id="lien" type="url" inputMode="url" value={carnet.lien} placeholder="https://youtu.be/…" onChange={(e) => set({ lien: e.target.value })} />
              {carnet.lien.trim() !== '' && !film && <small className="ko">Ce lien n’est pas un lien YouTube en https.</small>}
            </label>
            {film && (
              <p>
                <a href={film} target="_blank" rel="noreferrer">
                  Voir le film sur YouTube
                </a>
              </p>
            )}
            <Texte id="bilan" label="Bilan : ce qui a marché, ce qu’on referait autrement" value={carnet.bilan} onChange={(v) => set({ bilan: v })} rows={4} />
          </>
        )}

        <div className="pager">
          <button disabled={idx === 0} onClick={() => setEtape(ETAPES[idx - 1].id)}>
            Étape précédente
          </button>
          <span className="muted">Enregistré automatiquement</span>
          <button className="primary" disabled={idx === ETAPES.length - 1} onClick={() => setEtape(ETAPES[idx + 1].id)}>
            Étape suivante
          </button>
        </div>
      </section>
    </>
  )
}
