// Illustrations attachées aux contenus : liens vers des extraits ou des cours, et images.
// Clé : « term:plan », « period:muet », « director:varda », « atelier:hors-champ ».

export interface Media {
  id: string
  kind: 'lien' | 'image'
  title: string
  url?: string // lien https
  src?: string // image encodée
  status: 'valide' | 'propose' // une proposition d'élève reste invisible des autres tant qu'elle n'est pas validée
  by?: string // identifiant de l'élève qui propose
}

// N'accepte que des liens https : pas de javascript:, data: ni http en clair.
export function lienSur(raw: string): string | null {
  try {
    const u = new URL(raw.trim())
    return u.protocol === 'https:' ? u.href : null
  } catch {
    return null
  }
}

export const rechercheYoutube = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

// Liens de départ : le cours en ligne « Vocabulaire de l'analyse filmique » d'Upopi (Ciclic),
// illustré par des extraits de films. Adresses relevées sur vocabulaire.ciclic.fr le 9 novembre 2026.
const UPOPI = 'https://vocabulaire.ciclic.fr/fr/definition/sceance-'
const upopi: Record<string, [string, string]> = {
  plan: ['3#definition-3-1', 'Le plan, unité de fabrication'],
  cadre: ['1#definition-1-2', 'Cadre, champ, hors-champ'],
  champ: ['1#definition-1-3', 'Usages du hors-champ'],
  echelle: ['4#definition-4-1', 'Grosseurs de plan'],
  'gros-plan': ['4#definition-4-1', 'Grosseurs de plan'],
  plongee: ['4#definition-4-2', 'Angles de prise de vues'],
  profondeur: ['2#definition-2-3', 'Profondeur de champ'],
  panoramique: ['5#definition-5-1', 'Mouvements de caméra'],
  travelling: ['5#definition-5-1', 'Mouvements de caméra'],
  'camera-subjective': ['5#definition-5-3', 'Plans subjectifs'],
  montage: ['7#definition-7-1', 'Découpage'],
  raccord: ['7#definition-7-3', 'Raccords'],
  'champ-contrechamp': ['7#definition-7-3', 'Raccords (champ-contrechamp)'],
  ellipse: ['8#definition-8-2', 'Montage et durée du récit'],
  flashback: ['8#definition-8-1', 'Montage et ordre du récit'],
  'montage-alterne': ['9#definition-9-1', 'Montage et analogies'],
  'montage-parallele': ['9#definition-9-1', 'Montage et analogies'],
  'son-in': ['10#definition-10-2', 'In, hors champ, off'],
  'clair-obscur': ['6#definition-6-2', 'Styles d’éclairage'],
  'contre-jour': ['6#definition-6-1', 'Lumière'],
}

export function seedMedias(): Record<string, Media[]> {
  const medias: Record<string, Media[]> = Object.fromEntries(
    Object.entries(upopi).map(([id, [path, title]]) => [
      `term:${id}`,
      [{ id: `upopi-${id}`, kind: 'lien', title: `Cours Upopi : ${title}`, url: UPOPI + path, status: 'valide' } satisfies Media],
    ]),
  )
  // Exemples de propositions d'élèves en attente, pour la démonstration.
  medias['term:travelling'].push({
    id: 'demo-p1', kind: 'lien', status: 'propose', by: 's2',
    title: 'Les couloirs de l’hôtel dans Shining',
    url: rechercheYoutube('Shining travelling couloir tricycle'),
  })
  medias['director:varda'] = [{
    id: 'demo-p2', kind: 'lien', status: 'propose', by: 's8',
    title: 'Varda filme sa main dans Les Glaneurs et la Glaneuse',
    url: rechercheYoutube('Les Glaneurs et la Glaneuse Varda main camion'),
  }]
  return medias
}
