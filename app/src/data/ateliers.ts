// Ateliers de création et carnets de groupe.
// Corpus de départ rédigé par IA — à relire et adapter par l'enseignant.

export interface Atelier {
  id: string
  title: string
  kind: 'Atelier' | 'Court métrage'
  duration: string
  consigne: string
  contraintes: string[]
  notions: string[] // identifiants de TERMS
  references: string[] // scènes à montrer avant de commencer
}

export interface Plan {
  id: string
  echelle: string
  angle: string
  mouvement: string
  action: string
  son: string
  croquis?: string // dessin au doigt, image encodée
  tourne: boolean
}

export interface Carnet {
  idee: string
  registre: string
  lieu: string
  personnages: string
  scenario: string
  photos: string[] // photos du tableau, réduites et encodées
  plans: Plan[]
  roles: string
  lien: string
  bilan: string
}

export const ATELIERS: Atelier[] = [
  {
    id: 'hors-champ',
    title: 'L’événement hors champ',
    kind: 'Atelier',
    duration: '1 h 30',
    consigne:
      'Réaliser une scène où quelque chose d’important se produit sans jamais être montré. Le spectateur doit le comprendre par les réactions, les regards et le son.',
    contraintes: ['5 plans au maximum', 'Un seul lieu', 'L’événement n’apparaît jamais à l’image'],
    notions: ['champ', 'cadre', 'son-in', 'raccord'],
    references: [
      'M le maudit (Lang, 1931) — le ballon et la chaise vide',
      'Les Dents de la mer (Spielberg, 1975) — l’ouverture, le requin invisible',
    ],
  },
  {
    id: 'rencontre',
    title: 'La rencontre',
    kind: 'Atelier',
    duration: '1 h 30',
    consigne:
      'Filmer la première rencontre entre deux personnages. On doit sentir que quelque chose se passe entre eux avant qu’ils se parlent.',
    contraintes: ['Pas de dialogue pendant les 3 premiers plans', 'Au moins un gros plan', 'Un raccord regard'],
    notions: ['champ-contrechamp', 'gros-plan', 'raccord', 'echelle'],
    references: [
      'West Side Story (Wise et Robbins, 1961) — la rencontre au bal',
      'In the Mood for Love (Wong Kar-wai, 2000) — les croisements dans l’escalier',
    ],
  },
  {
    id: 'dialogue',
    title: 'Le dialogue à deux',
    kind: 'Atelier',
    duration: '1 h 30',
    consigne:
      'Écrire puis filmer un dialogue entre deux personnages dont l’un cache quelque chose à l’autre. La mise en scène doit en dire plus que les mots.',
    contraintes: ['10 répliques au maximum', 'Tourner la scène de deux façons : en champ-contrechamp, puis en un seul plan'],
    notions: ['champ-contrechamp', 'plan-sequence', 'echelle', 'point-de-vue'],
    references: [
      'À bout de souffle (Godard, 1960) — la chambre d’hôtel',
      'Le Mépris (Godard, 1963) — la scène de l’appartement',
    ],
  },
  {
    id: 'vue-lumiere',
    title: 'Une minute, un plan',
    kind: 'Atelier',
    duration: '1 h',
    consigne:
      'Tourner une « vue » à la manière des frères Lumière : un seul plan fixe d’une minute, sans coupe ni son ajouté, où il se passe quelque chose du début à la fin.',
    contraintes: ['Plan fixe, caméra posée', 'Une minute exactement', 'Aucun montage'],
    notions: ['plan', 'cadre', 'profondeur', 'champ'],
    references: ['La Sortie de l’usine Lumière à Lyon (1895)', 'L’Arrivée d’un train en gare de La Ciotat (1896)'],
  },
  {
    id: 'court-metrage',
    title: 'Le court métrage du club',
    kind: 'Court métrage',
    duration: 'Plusieurs séances',
    consigne:
      'Écrire, préparer, tourner et monter un film de 3 à 5 minutes. Chacun tient un poste : réalisation, image, son, jeu, montage.',
    contraintes: ['3 à 5 minutes', 'Deux lieux au maximum', 'Un storyboard complet avant de tourner'],
    notions: ['sequence', 'montage', 'ellipse', 'point-de-vue'],
    references: [],
  },
]

type Option = { label: string; hint: string }

export const ECHELLES: Option[] = [
  { label: 'Plan général', hint: 'Le décor entier ; les personnages sont tout petits.' },
  { label: 'Plan d’ensemble', hint: 'Le lieu et les personnages en entier dans leur décor.' },
  { label: 'Plan moyen', hint: 'Le personnage en pied, de la tête aux pieds.' },
  { label: 'Plan américain', hint: 'Le personnage coupé à mi-cuisse.' },
  { label: 'Plan rapproché', hint: 'Le personnage cadré à la taille ou à la poitrine.' },
  { label: 'Gros plan', hint: 'Un visage ou un objet : on isole un détail, une émotion.' },
  { label: 'Très gros plan', hint: 'Un détail seul : un œil, une main, une poignée de porte.' },
]

export const ANGLES: Option[] = [
  { label: 'À hauteur', hint: 'La caméra est à la hauteur du regard.' },
  { label: 'Plongée', hint: 'La caméra regarde vers le bas : le sujet paraît dominé.' },
  { label: 'Contre-plongée', hint: 'La caméra regarde vers le haut : le sujet paraît grand, menaçant.' },
]

export const MOUVEMENTS: Option[] = [
  { label: 'Fixe', hint: 'La caméra ne bouge pas.' },
  { label: 'Panoramique', hint: 'La caméra pivote sur place, sans se déplacer.' },
  { label: 'Travelling', hint: 'La caméra se déplace : elle avance, recule ou suit.' },
  { label: 'Caméra portée', hint: 'Tenue à la main : l’image bouge avec celui qui filme.' },
  { label: 'Zoom', hint: 'Le cadre se resserre ou s’élargit sans que la caméra se déplace.' },
]

export const REGISTRES = ['Suspense', 'Comique', 'Dramatique', 'Romantique', 'Fantastique', 'Réaliste']

export const emptyCarnet = (): Carnet => ({
  idee: '', registre: '', lieu: '', personnages: '', scenario: '', photos: [], plans: [], roles: '', lien: '', bilan: '',
})

export const newPlan = (): Plan => ({
  id: Math.random().toString(36).slice(2, 9),
  echelle: 'Plan moyen', angle: 'À hauteur', mouvement: 'Fixe', action: '', son: '', tourne: false,
})

export const ETAPES: { id: string; label: string; done: (c: Carnet) => boolean }[] = [
  { id: 'idee', label: 'Idée', done: (c) => c.idee.trim() !== '' },
  { id: 'cadre', label: 'Cadre et personnages', done: (c) => c.lieu.trim() !== '' && c.personnages.trim() !== '' },
  { id: 'scenario', label: 'Scénario', done: (c) => c.scenario.trim() !== '' },
  { id: 'storyboard', label: 'Storyboard', done: (c) => c.photos.length > 0 || (c.plans.length > 0 && c.plans.every((p) => p.action.trim() !== '')) },
  { id: 'tournage', label: 'Tournage', done: (c) => c.plans.length > 0 && c.plans.every((p) => p.tourne) },
  { id: 'film', label: 'Film', done: (c) => youtubeUrl(c.lien) !== null },
]

export const avancement = (c: Carnet) => ETAPES.filter((e) => e.done(c)).length

// Seuls les liens YouTube sont acceptés : l'outil n'héberge aucune vidéo.
export function youtubeUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim())
    const host = u.hostname.replace(/^www\.|^m\./, '')
    return u.protocol === 'https:' && (host === 'youtube.com' || host === 'youtu.be') ? u.href : null
  } catch {
    return null
  }
}

export const carnetId = (atelierId: string, groupId: string) => `${atelierId}--${groupId}`

// Exemple rempli : l'atelier « hors champ » tel qu'il pourrait être mené sur une pause de midi.
export const seedCarnets = (): Record<string, Carnet> => ({
  [carnetId('hors-champ', 'g1')]: {
    idee: 'Pendant un contrôle, un grand fracas retentit dans le couloir. On ne verra jamais ce qui s’est passé : seulement les visages de ceux qui regardent par la porte.',
    registre: 'Suspense',
    lieu: 'Une salle de classe, pendant la pause de midi. Porte entrouverte sur le couloir.',
    personnages: 'Inès, élève concentrée, qui refuse d’abord de lever la tête.\nMalo, son voisin, le premier à se lever.\nLa surveillante, qu’on entend sans la voir.',
    scenario:
      'INT. SALLE DE CLASSE — JOUR\n\nSilence. Des stylos grattent le papier.\n\nUn FRACAS dans le couloir. Tout le monde se fige.\n\nMALO\n(à voix basse)\nT’as entendu ?\n\nINÈS\nNon.\n\nMalo se lève, va jusqu’à la porte, regarde. Son visage change.\n\nLA SURVEILLANTE (off)\nPersonne ne sort !\n\nInès finit par lever les yeux vers la porte.',
    photos: [],
    plans: [
      { id: 'a1', echelle: 'Plan d’ensemble', angle: 'À hauteur', mouvement: 'Fixe', action: 'La classe en plein contrôle, la porte entrouverte au fond.', son: 'Stylos, horloge.', tourne: true },
      { id: 'a2', echelle: 'Gros plan', angle: 'Plongée', mouvement: 'Fixe', action: 'La main d’Inès qui écrit, puis s’arrête net.', son: 'Fracas hors champ.', tourne: true },
      { id: 'a3', echelle: 'Plan rapproché', angle: 'À hauteur', mouvement: 'Panoramique', action: 'Malo se lève ; la caméra le suit jusqu’à la porte.', son: 'Chaise qui racle, pas.', tourne: true },
      { id: 'a4', echelle: 'Gros plan', angle: 'À hauteur', mouvement: 'Fixe', action: 'Le visage de Malo qui regarde dans le couloir. Il blêmit.', son: 'Voix de la surveillante, off.', tourne: false },
      { id: 'a5', echelle: 'Gros plan', angle: 'À hauteur', mouvement: 'Fixe', action: 'Inès lève enfin les yeux vers la porte.', son: 'Silence.', tourne: false },
    ],
    roles: 'Réalisation : Jade\nCadre : Malo (plans 1, 2, 5), Jade (plans 3, 4)\nSon : Inès\nJeu : Inès, Malo',
    lien: '',
    bilan: '',
  },
  [carnetId('rencontre', 'g2')]: {
    ...emptyCarnet(),
    idee: 'Deux élèves attendent devant le même distributeur en panne. Aucun des deux n’ose parler le premier.',
    registre: 'Comique',
  },
  [carnetId('vue-lumiere', 'g3')]: emptyCarnet(),
})
