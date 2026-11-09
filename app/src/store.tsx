import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Level } from './data/content'
import { emptyProgress, seedProgress, seedSteps, type Progress } from './data/demo'

// Prototype : tout l'état vit dans le navigateur (localStorage), sans serveur.
export type Session = { role: 'eleve'; studentId: string } | { role: 'enseignant' } | null

interface State {
  session: Session
  level: Level
  progress: Record<string, Progress>
  steps: Record<string, string[]>
}

interface Store extends State {
  login: (s: Session) => void
  setLevel: (l: Level) => void
  toggle: (kind: 'periods' | 'terms' | 'directors', id: string) => void
  saveQuiz: (level: Level, score: number) => void
  toggleStep: (projectId: string, stepId: string) => void
  reset: () => void
  me: Progress
}

const KEY = 'clubcine-proto-v1'
const initial = (): State => ({ session: null, level: 1, progress: seedProgress(), steps: seedSteps() })

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initial(), ...JSON.parse(raw) }
  } catch {
    /* stockage indisponible : on repart des données de démo */
  }
  return initial()
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignoré */
    }
  }, [state])

  const sid = state.session?.role === 'eleve' ? state.session.studentId : null
  const me = (sid && state.progress[sid]) || emptyProgress()
  const updateMe = (fn: (p: Progress) => Progress) => {
    if (!sid) return
    setState((s) => ({ ...s, progress: { ...s.progress, [sid]: fn(s.progress[sid] ?? emptyProgress()) } }))
  }
  const flip = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

  const store: Store = {
    ...state,
    me,
    login: (session) => setState((s) => ({ ...s, session })),
    setLevel: (level) => setState((s) => ({ ...s, level })),
    toggle: (kind, id) => updateMe((p) => ({ ...p, [kind]: flip(p[kind], id) })),
    saveQuiz: (level, score) =>
      updateMe((p) => ({ ...p, quiz: { ...p.quiz, [level]: Math.max(score, p.quiz[level] ?? 0) } })),
    toggleStep: (projectId, stepId) =>
      setState((s) => ({ ...s, steps: { ...s.steps, [projectId]: flip(s.steps[projectId] ?? [], stepId) } })),
    reset: () => setState(initial()),
  }
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('StoreProvider manquant')
  return s
}
