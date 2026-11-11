// Extraits choisis par l'enseignant du club, repris de son tableau netboard (relevé le 11 novembre 2026).
// Titres recopiés tels quels. Les vidéos restent chez leur hébergeur : l'application ne garde que les liens.

export const SOURCE_EXTRAITS = 'https://dupeubledamien.netboard.me/cinsclub/'

export interface Theme { id: string; title: string; extraits: { title: string; url: string }[] }

export const THEMES: Theme[] = [
  {
    id: 'ouvertures',
    title: 'Les scènes d’ouverture',
    extraits: [
      { title: 'Steven Spielberg, Il faut sauver le soldat Ryan (1998)', url: 'https://www.dailymotion.com/video/x1mysc' },
      { title: 'Stanley Kubrick, Orange mécanique (1971)', url: 'https://www.youtube.com/watch?v=hrM7X-J034M' },
      { title: 'Park Chan-Wook, Old boy (2003)', url: 'https://www.youtube.com/watch?v=C3tZhWpnGaQ' },
      { title: 'Là-Haut (2009)', url: 'https://www.youtube.com/watch?v=NarPV7pJmg4' },
      { title: 'Damien Chazelle, La La Land (2016)', url: 'https://www.youtube.com/watch?v=xVVqlm8Fq3Y' },
    ],
  },
  {
    id: 'plans-sequence',
    title: 'Les plans-séquence',
    extraits: [
      { title: 'Les plus célèbres plans-séquences tournés grâce au Steadicam', url: 'https://www.cnc.fr/cinema/focus/les-plus-celebres-planssequences-tournes-grace-au-steadicam_952716' },
      { title: 'Orson Welles, La soif du mal (1958)', url: 'https://www.youtube.com/watch?v=vm97MdLVdPU' },
      { title: 'Mikhaïl Kalatozov, Soy Cuba (1964)', url: 'https://www.youtube.com/watch?v=eOLVm_9UcRw' },
      { title: 'Sam Mendes, 007 Spectre (2015) - Le Jour des morts (Scène d’ouverture)', url: 'https://www.youtube.com/watch?v=AC03N6Pik-4' },
    ],
  },
  {
    id: 'montage',
    title: 'Le montage',
    extraits: [
      { title: 'LES 3 FONCTIONS DU MONTAGE AU CINÉMA', url: 'https://www.youtube.com/watch?v=ZMW-fGOHb5o' },
      { title: 'Suggérer / comparer / associer - Transmettre le cinéma', url: 'https://transmettrelecinema.com/video/suggerer-comparer-associer/' },
      { title: 'L’effet Koulechov : comment faire croire qu’un acteur sait bien jouer', url: 'https://www.dailymotion.com/video/xuy228' },
    ],
  },
  {
    id: 'mouvements',
    title: 'Les mouvements de caméra',
    extraits: [
      { title: 'Les Mouvements de caméra au cinéma - Blow up - ARTE', url: 'https://www.youtube.com/watch?v=00dQC2yCIJA' },
      { title: 'JEREMY - LE TRAVELLING', url: 'https://www.youtube.com/watch?v=fQQMPrqP6Qo' },
      { title: 'Contrechamp 7 : l’effet Vertigo de Hitchcock, du génie au cliché', url: 'https://www.youtube.com/watch?v=yAkSXTqKj7Q' },
    ],
  },
  {
    id: 'innovations',
    title: 'Innovations au cinéma',
    extraits: [
      { title: 'La technique au cinéma : 8 évolutions majeures qui ont traversé l’histoire Cannoise - Festival de Cannes', url: 'https://www.festival-cannes.com/cannes-focus/la-technique-au-cinema-8-evolutions-majeures-qui-ont-traverse-l-histoire-cannoise/' },
      { title: 'Apprendre Le Cinema', url: 'https://www.apprendre-le-cinema.fr/article/3-procedes-techniques-utilises-par-des-grands-scenaristes' },
    ],
  },
  {
    id: 'musique',
    title: 'La musique',
    extraits: [
      { title: 'Musique diégétique - Transmettre le cinéma', url: 'https://transmettrelecinema.com/video/musique-diegetique/' },
      { title: 'Wes Anderson, Moonrise Kingdom (2005)', url: 'https://www.youtube.com/watch?v=riO_F5D1LBc' },
      { title: 'Jean-Pierre Jeunet, Le fabuleux destin d’Amélie Poulain (2001)', url: 'https://www.youtube.com/watch?v=jSuTU2C_WH8' },
      { title: 'Bong Joon-Ho (Peach Scene) Parasite (2019)', url: 'https://www.youtube.com/watch?v=PR1Z7xpKfqM' },
      { title: 'F. Ford Coppola, Apocalypse Now (1979) - ’Ride of the Valkyries’', url: 'https://www.youtube.com/watch?v=nZ_zNUmr8fM' },
    ],
  },
  {
    id: 'voix',
    title: 'La voix',
    extraits: [
      { title: 'The Grand Budapest Hotel : Bande-annonce [Officielle] VOST HD', url: 'https://www.youtube.com/watch?v=sE-os0Vswsw' },
      { title: 'Stanley Kubrick, Barry Lyndon (1975) voix off', url: 'https://go.screenpal.com/watch/cZXFrOnV3KT' },
      { title: 'La Voix au cinéma - Blow Up - ARTE', url: 'https://www.youtube.com/watch?v=-NZY2-8a1yA' },
    ],
  },
  {
    id: 'macguffin',
    title: 'Le McGuffin',
    extraits: [
      { title: 'Le MacGuffin, ou l’art de lancer une intrigue au cinéma', url: 'https://www.radiofrance.fr/franceculture/le-macguffin-ou-l-art-de-lancer-une-intrigue-au-cinema-2683842' },
      { title: 'MacGuffin - Liste de 25 films - SensCritique', url: 'https://www.senscritique.com/liste/mac_guffin/9609' },
    ],
  },
  {
    id: 'suspense',
    title: 'Le suspense',
    extraits: [
      { title: 'Alfred Hitchcock, La Corde (1948) Un accroc', url: 'https://go.screenpal.com/watch/cZXXranVcQS' },
      { title: 'Steven Spielberg, Munich (2005) Scène du téléphone', url: 'https://go.screenpal.com/watch/cZX6YMnc91h' },
    ],
  },
  {
    id: 'duels',
    title: 'Les duels',
    extraits: [
      { title: 'Stanley Kubrick, Barry Lyndon (1975)', url: 'https://go.screenpal.com/watch/cZXFY9nV3GD' },
      { title: 'Sergio Leone, Il était une fois dans l’Ouest (Duel final) (1968)', url: 'https://go.screenpal.com/watch/cY6Q2ZKKOZ' },
    ],
  },
  {
    id: 'rencontre',
    title: 'La rencontre amoureuse',
    extraits: [
      { title: 'JP Jeunet, Le fabuleux destin d’Amélie Poulain (Amélie et Nino) (2001)', url: 'https://www.youtube.com/watch?v=WOWInMGctTg&list=PL47jhpzs8XALepo_GQXL9tszq3TnxDzhs&index=3' },
      { title: 'Tim Burton, Big Fish - Edward et Sandra (2003)', url: 'https://www.youtube.com/watch?v=zgDwAb5cIj4&list=PL47jhpzs8XALepo_GQXL9tszq3TnxDzhs&index=2' },
      { title: 'Stanley Kubrick, Barry Lyndon (1975) La rencontre de Miss Lyndon', url: 'https://www.youtube.com/watch?v=KT7IYpjcpD4' },
    ],
  },
  {
    id: 'courts',
    title: 'Courts métrages',
    extraits: [
      { title: 'Chien Bleu - Nommé comme Meilleur court métrage à la 45e cérémonie des César 2020', url: 'https://www.youtube.com/watch?v=bAttTIb5v_A' },
      { title: 'LE PLEIN | Nikon Film Festival [FR/ENG]', url: 'https://www.youtube.com/watch?v=XqXJVPangkw' },
      { title: 'L’ÉCHAUFFEMENT | Nikon Film Festival [FR/ENG]', url: 'https://www.youtube.com/watch?v=A7La8K8sZzk' },
      { title: 'Nikon Film Festival - DANS NOS VEINES', url: 'https://festivalnikon.fr/video/2024/7577' },
      { title: 'Le marionnettiste', url: 'https://www.youtube.com/watch?v=Bur43uDu10Y&t=129s' },
      { title: 'Fragments d’un Antoine amoureux - Court Métrage', url: 'https://www.youtube.com/watch?v=8W7B0X2nefg' },
      { title: 'iNTELLIGENCE | Court métrage | ARTE', url: 'https://www.youtube.com/watch?v=mUJ8Sq4VnUc' },
    ],
  },
  {
    id: 'histoire',
    title: 'Histoire du cinéma',
    extraits: [
      { title: 'HISTOIRE DU CINÉMA | 6 LA NOUVELLE VAGUE en 5min', url: 'https://www.youtube.com/watch?v=-sYYKgA8Fxw' },
      { title: 'HISTOIRE DU CINÉMA | 5 LE NÉORÉALISME ITALIEN en 5min', url: 'https://www.youtube.com/watch?v=MfZ3daXCV0w' },
      { title: 'HISTOIRE DU CINÉMA | 4 LE CINÉMA CLASSIQUE HOLLYWOODIEN en 5min', url: 'https://www.youtube.com/watch?v=HVWvmPMifOY' },
    ],
  },
  {
    id: 'peur',
    title: 'L’angoisse et la peur',
    extraits: [
      { title: 'Mulholland Drive - Diner Scene', url: 'https://www.youtube.com/watch?v=UozhOo0Dt4o' },
      { title: 'Cat People / La Féline (1942) - Effet-bus', url: 'https://www.youtube.com/watch?v=QSou8Bv5__M' },
    ],
  },
]

// Où chaque extrait sert aussi d'illustration : clé du contenu → [thème, rang dans le thème].
export const RENVOIS: Record<string, [string, number][]> = {
  'term:plan-sequence': [['plans-sequence', 1], ['plans-sequence', 2], ['plans-sequence', 3], ['plans-sequence', 0]],
  'term:montage': [['montage', 0], ['montage', 1]],
  'term:effet-koulechov': [['montage', 2]],
  'term:travelling': [['mouvements', 1], ['mouvements', 2], ['mouvements', 0]],
  'term:panoramique': [['mouvements', 0]],
  'term:diegetique': [['musique', 0], ['musique', 4]],
  'term:son-in': [['voix', 1], ['voix', 2]],
  'period:parlant': [['histoire', 2]],
  'period:apres-guerre': [['histoire', 1]],
  'period:nouvelles-vagues': [['histoire', 0]],
  'director:hitchcock': [['suspense', 0], ['mouvements', 2], ['macguffin', 0]],
  'director:kubrick': [['ouvertures', 1], ['duels', 0], ['rencontre', 2]],
  'atelier:rencontre': [['rencontre', 0], ['rencontre', 1], ['rencontre', 2]],
  'atelier:hors-champ': [['peur', 1], ['suspense', 1]],
  'atelier:court-metrage': [['courts', 0], ['courts', 1], ['courts', 2]],
}
