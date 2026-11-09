// Données de démonstration : élèves et groupes fictifs du club.
import { DIRECTORS, PERIODS, TERMS, type Level } from './content'

export interface Student { id: string; name: string; classe: string; groupId: string }
export interface Group { id: string; name: string }
export interface Progress {
  periods: string[]
  terms: string[]
  directors: string[]
  quiz: Partial<Record<Level, number>> // meilleur score en %
}

export const GROUPS: Group[] = [
  { id: 'g1', name: 'Groupe Lumière' },
  { id: 'g2', name: 'Groupe Méliès' },
  { id: 'g3', name: 'Groupe Varda' },
]

export const STUDENTS: Student[] = [
  { id: 's1', name: 'Inès', classe: '1re', groupId: 'g1' },
  { id: 's2', name: 'Malo', classe: '1re', groupId: 'g1' },
  { id: 's3', name: 'Jade', classe: '1re', groupId: 'g1' },
  { id: 's4', name: 'Noé', classe: '1re', groupId: 'g2' },
  { id: 's5', name: 'Lina', classe: '1re', groupId: 'g2' },
  { id: 's6', name: 'Sacha', classe: '1re', groupId: 'g2' },
  { id: 's7', name: 'Yanis', classe: '1re', groupId: 'g3' },
  { id: 's8', name: 'Clémence', classe: '1re', groupId: 'g3' },
  { id: 's9', name: 'Tom', classe: '1re', groupId: 'g3' },
]

export const emptyProgress = (): Progress => ({ periods: [], terms: [], directors: [], quiz: {} })

// Progression simulée et stable pour les élèves de démonstration.
function seeded(i: number): Progress {
  const take = <T extends { id: string }>(arr: T[], ratio: number) =>
    arr.slice(0, Math.round(arr.length * ratio)).map((x) => x.id)
  const r = [0.75, 0.4, 0.9, 0.25, 0.6, 0.1, 0.5, 1, 0.35][i % 9]
  const quiz: Progress['quiz'] = {}
  if (r > 0.2) quiz[1] = Math.round(50 + r * 50)
  if (r > 0.5) quiz[2] = Math.round(30 + r * 60)
  if (r > 0.85) quiz[3] = Math.round(r * 75)
  return { periods: take(PERIODS, r), terms: take(TERMS, r * 0.9), directors: take(DIRECTORS, r * 0.8), quiz }
}

export const seedProgress = (): Record<string, Progress> =>
  Object.fromEntries(STUDENTS.map((s, i) => [s.id, i === 0 ? emptyProgress() : seeded(i)]))
