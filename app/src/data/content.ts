// Corpus de démarrage rédigé par IA — À RELIRE ET VALIDER par l'enseignant·e.
// Chaque contenu porte un niveau : 1 Découverte, 2 Approfondissement, 3 Expert.

export type Level = 1 | 2 | 3
export const LEVELS: { id: Level; label: string }[] = [
  { id: 1, label: 'Découverte' },
  { id: 2, label: 'Approfondissement' },
  { id: 3, label: 'Expert' },
]

export interface Period {
  id: string
  title: string
  years: string
  level: Level
  summary: string
  keyPoints: string[]
  films: string[]
}

export interface Term {
  id: string
  term: string
  category: 'Cadre' | 'Mouvement' | 'Montage' | 'Son' | 'Lumière' | 'Récit'
  level: Level
  definition: string
  example?: string
}

export interface Director {
  id: string
  name: string
  dates: string
  country: string
  level: Level
  bio: string
  style: string[]
  films: string[]
}

export interface Question {
  id: string
  level: Level
  theme: 'Histoire' | 'Vocabulaire' | 'Réalisateurs'
  question: string
  choices: string[]
  answer: number
  explanation: string
}

export const PERIODS: Period[] = [
  {
    id: 'origines',
    title: 'Les origines',
    years: '1895 – 1914',
    level: 1,
    summary:
      "Le cinéma naît à la croisée de la science, de la photographie et du spectacle forain. En quelques années, il passe de la « vue » d'une minute au récit de fiction.",
    keyPoints: [
      "28 décembre 1895 : première projection publique payante du Cinématographe Lumière, au Salon indien du Grand Café à Paris.",
      "Les frères Lumière filment le réel (« vues ») ; Georges Méliès invente le trucage et la féerie.",
      "Alice Guy réalise des fictions dès 1896 et devient la première femme cinéaste.",
      "Le cinéma est d'abord une attraction de foire avant de s'installer dans des salles dédiées.",
    ],
    films: ["La Sortie de l'usine Lumière à Lyon (1895)", 'Le Voyage dans la Lune (Méliès, 1902)', 'Le Vol du grand rapide (Porter, 1903)'],
  },
  {
    id: 'muet',
    title: 'Âge d’or du muet et avant-gardes',
    years: '1915 – 1929',
    level: 1,
    summary:
      "Sans parole synchronisée, le cinéma invente son propre langage : le montage, le gros plan, le jeu des corps. Chaque pays développe une école.",
    keyPoints: [
      'Le burlesque américain : Charlie Chaplin, Buster Keaton, Harold Lloyd.',
      "L'expressionnisme allemand déforme décors et lumières pour exprimer l'angoisse (Le Cabinet du docteur Caligari, 1920).",
      "L'école soviétique théorise le montage : Eisenstein, Vertov, Koulechov.",
      'En France, les avant-gardes (Gance, Epstein, Dulac) explorent le rythme et la subjectivité.',
    ],
    films: ['Le Cuirassé Potemkine (Eisenstein, 1925)', 'Le Mécano de la « General » (Keaton, 1926)', 'Metropolis (Lang, 1927)'],
  },
  {
    id: 'parlant',
    title: 'Le parlant et les grands studios',
    years: '1927 – 1945',
    level: 2,
    summary:
      "L'arrivée du son bouleverse la technique, le jeu et l'économie du cinéma. Hollywood impose le système des studios et des genres.",
    keyPoints: [
      'Le Chanteur de jazz (1927) popularise le film parlant.',
      'Hollywood classique : studios, stars, genres codifiés (western, comédie musicale, film de gangsters).',
      'En France, le réalisme poétique : Carné, Prévert, Renoir, Vigo.',
      'Citizen Kane (Welles, 1941) renouvelle le récit et la profondeur de champ.',
    ],
    films: ['M le maudit (Lang, 1931)', 'La Règle du jeu (Renoir, 1939)', 'Citizen Kane (Welles, 1941)'],
  },
  {
    id: 'apres-guerre',
    title: 'Néoréalisme et après-guerre',
    years: '1945 – 1958',
    level: 2,
    summary:
      "Après la guerre, des cinéastes sortent des studios pour filmer la rue, les gens ordinaires et les ruines. Le cinéma devient aussi un objet de critique et de pensée.",
    keyPoints: [
      'Néoréalisme italien : décors réels, acteurs non professionnels, sujets sociaux (Rossellini, De Sica, Visconti).',
      'Le film noir américain : ombres, fatalité, détectives et femmes fatales.',
      "Le cinéma japonais est découvert en Occident avec Rashômon (Kurosawa, 1950).",
      'Les Cahiers du cinéma (fondés en 1951) défendent la « politique des auteurs ».',
    ],
    films: ['Rome, ville ouverte (Rossellini, 1945)', 'Le Voleur de bicyclette (De Sica, 1948)', 'Rashômon (Kurosawa, 1950)'],
  },
  {
    id: 'nouvelles-vagues',
    title: 'Les Nouvelles Vagues',
    years: '1958 – 1968',
    level: 2,
    summary:
      "De jeunes cinéastes, souvent anciens critiques, tournent vite, légèrement et librement. Le mouvement part de France et essaime dans le monde entier.",
    keyPoints: [
      'Tournages en décors naturels, petites équipes, caméras légères, son direct.',
      'Truffaut, Godard, Chabrol, Rohmer, Rivette ; et la « Rive gauche » : Varda, Resnais, Marker.',
      'Ruptures de ton, regards caméra, faux raccords assumés.',
      'Échos mondiaux : Free Cinema britannique, Cinema Novo brésilien, Nouvelle Vague japonaise et tchécoslovaque.',
    ],
    films: ['Les Quatre Cents Coups (Truffaut, 1959)', 'À bout de souffle (Godard, 1960)', 'Cléo de 5 à 7 (Varda, 1962)'],
  },
  {
    id: 'nouvel-hollywood',
    title: 'Le Nouvel Hollywood',
    years: '1967 – 1980',
    level: 3,
    summary:
      "Une génération de cinéastes formés à la cinéphilie prend le pouvoir à Hollywood, avec des films plus sombres et personnels — avant le retour du grand spectacle.",
    keyPoints: [
      'Influence des nouvelles vagues européennes sur le cinéma américain.',
      'Anti-héros, violence, fins ouvertes, critique de la société américaine.',
      'Coppola, Scorsese, Altman, De Palma, Cimino.',
      'Les Dents de la mer (1975) et Star Wars (1977) inaugurent l’ère du blockbuster.',
    ],
    films: ['Bonnie and Clyde (Penn, 1967)', 'Le Parrain (Coppola, 1972)', 'Taxi Driver (Scorsese, 1976)'],
  },
  {
    id: 'monde',
    title: 'Cinémas du monde et indépendants',
    years: '1980 – 1999',
    level: 3,
    summary:
      "Les festivals révèlent des cinématographies de tous les continents, tandis que le cinéma indépendant et l'image de synthèse transforment les formes.",
    keyPoints: [
      "Reconnaissance des cinémas d'Asie et du Moyen-Orient : Wong Kar-wai, Abbas Kiarostami, Hou Hsiao-hsien.",
      'Cinéma indépendant américain : Jarmusch, Spike Lee, Tarantino.',
      'Dogme 95 (von Trier, Vinterberg) : un manifeste pour un cinéma dépouillé.',
      'Toy Story (1995) : premier long métrage entièrement en images de synthèse.',
    ],
    films: ['Do the Right Thing (Spike Lee, 1989)', 'La Leçon de piano (Campion, 1993)', 'Le Goût de la cerise (Kiarostami, 1997)'],
  },
  {
    id: 'numerique',
    title: "L'ère numérique",
    years: '2000 – aujourd’hui',
    level: 3,
    summary:
      "Le numérique change la prise de vues, le montage, la diffusion et jusqu'à la définition même du cinéma, entre salles, plateformes et écrans mobiles.",
    keyPoints: [
      'Les caméras numériques légères ouvrent de nouvelles écritures (Varda, Les Glaneurs et la Glaneuse, 2000).',
      'La projection en salle passe de la pellicule au numérique.',
      'Les plateformes de streaming deviennent productrices et diffuseuses.',
      'Circulation mondiale des films : Parasite (Bong Joon-ho) remporte la Palme d’or 2019 puis l’Oscar du meilleur film.',
    ],
    films: ['In the Mood for Love (Wong Kar-wai, 2000)', 'Les Glaneurs et la Glaneuse (Varda, 2000)', 'Parasite (Bong Joon-ho, 2019)'],
  },
]

export const TERMS: Term[] = [
  { id: 'plan', term: 'Plan', category: 'Cadre', level: 1, definition: "Unité de base du film : suite d'images enregistrées en une seule prise, entre deux coupes." },
  { id: 'cadre', term: 'Cadre', category: 'Cadre', level: 1, definition: "Limites de l'image. Cadrer, c'est choisir ce que l'on montre et ce que l'on laisse dehors." },
  { id: 'champ', term: 'Champ / hors-champ', category: 'Cadre', level: 1, definition: "Le champ est la portion d'espace visible à l'image ; le hors-champ est tout ce qui existe autour sans être montré.", example: "Un bruit de pas hors-champ annonce l'arrivée d'un personnage." },
  { id: 'echelle', term: 'Échelle des plans', category: 'Cadre', level: 1, definition: 'Taille du sujet dans le cadre : plan général, plan d’ensemble, plan moyen, plan américain, plan rapproché, gros plan, très gros plan.' },
  { id: 'gros-plan', term: 'Gros plan', category: 'Cadre', level: 1, definition: "Cadre serré sur un visage ou un objet, qui isole un détail et intensifie l'émotion." },
  { id: 'plongee', term: 'Plongée / contre-plongée', category: 'Cadre', level: 1, definition: "Angle de prise de vues : en plongée la caméra regarde vers le bas, en contre-plongée vers le haut." },
  { id: 'profondeur', term: 'Profondeur de champ', category: 'Cadre', level: 2, definition: "Zone de netteté de l'image, de l'avant-plan à l'arrière-plan. Grande, elle permet de jouer sur plusieurs actions dans le même plan.", example: 'Citizen Kane (1941).' },
  { id: 'panoramique', term: 'Panoramique', category: 'Mouvement', level: 1, definition: 'La caméra pivote sur son axe (horizontalement ou verticalement) sans se déplacer.' },
  { id: 'travelling', term: 'Travelling', category: 'Mouvement', level: 1, definition: 'La caméra se déplace dans l’espace : avant, arrière, latéral ou d’accompagnement.' },
  { id: 'plan-sequence', term: 'Plan-séquence', category: 'Mouvement', level: 2, definition: "Séquence entière filmée en un seul plan, sans coupe.", example: "L'ouverture de La Soif du mal (Welles, 1958)." },
  { id: 'camera-subjective', term: 'Caméra subjective', category: 'Mouvement', level: 2, definition: "La caméra adopte le regard d'un personnage : le spectateur voit ce qu'il voit." },
  { id: 'montage', term: 'Montage', category: 'Montage', level: 1, definition: "Assemblage des plans dans un certain ordre et selon une certaine durée, qui construit le récit, le rythme et le sens." },
  { id: 'raccord', term: 'Raccord', category: 'Montage', level: 1, definition: "Manière de lier deux plans pour assurer la continuité : raccord regard, raccord mouvement, raccord dans l'axe." },
  { id: 'champ-contrechamp', term: 'Champ-contrechamp', category: 'Montage', level: 1, definition: 'Alternance de deux plans opposés, typique des scènes de dialogue.' },
  { id: 'ellipse', term: 'Ellipse', category: 'Montage', level: 2, definition: "Saut dans le temps : une partie de l'histoire n'est pas montrée." },
  { id: 'montage-alterne', term: 'Montage alterné', category: 'Montage', level: 2, definition: 'Alternance de deux actions simultanées se déroulant dans des lieux différents.', example: 'Une poursuite montée avec la victime qui attend les secours.' },
  { id: 'montage-parallele', term: 'Montage parallèle', category: 'Montage', level: 3, definition: "Alternance d'actions sans lien de simultanéité, rapprochées pour créer une comparaison ou une idée." },
  { id: 'faux-raccord', term: 'Faux raccord / jump cut', category: 'Montage', level: 3, definition: "Rupture volontaire de la continuité entre deux plans, qui fait sentir la coupe.", example: 'À bout de souffle (Godard, 1960).' },
  { id: 'effet-koulechov', term: 'Effet Koulechov', category: 'Montage', level: 3, definition: "Le sens d'un plan dépend des plans qui l'entourent : un même visage neutre semble exprimer des émotions différentes selon l'image qui suit." },
  { id: 'son-in', term: 'Son in / hors-champ / off', category: 'Son', level: 2, definition: "Son in : sa source est visible à l'image. Hors-champ : la source appartient à la scène mais n'est pas visible. Off : il vient d'ailleurs (voix off, musique de film)." },
  { id: 'diegetique', term: 'Diégétique / extradiégétique', category: 'Son', level: 3, definition: "Est diégétique ce qui appartient au monde de l'histoire (une radio allumée) ; extradiégétique ce qui s'y ajoute pour le spectateur (la musique d'accompagnement)." },
  { id: 'clair-obscur', term: 'Clair-obscur', category: 'Lumière', level: 2, definition: "Éclairage fortement contrasté entre zones de lumière et d'ombre, emblématique de l'expressionnisme et du film noir." },
  { id: 'contre-jour', term: 'Contre-jour', category: 'Lumière', level: 1, definition: 'La source lumineuse est placée derrière le sujet, qui apparaît en silhouette.' },
  { id: 'flashback', term: 'Flash-back', category: 'Récit', level: 1, definition: "Retour en arrière dans le récit : une scène du passé vient s'insérer dans le présent de l'histoire." },
  { id: 'sequence', term: 'Séquence', category: 'Récit', level: 1, definition: "Suite de plans formant une unité d'action, de lieu ou de temps — l'équivalent d'un chapitre." },
  { id: 'point-de-vue', term: 'Point de vue', category: 'Récit', level: 2, definition: "Place depuis laquelle l'histoire est racontée et perçue : celle d'un personnage, de plusieurs, ou d'un narrateur extérieur." },
]

export const DIRECTORS: Director[] = [
  { id: 'guy', name: 'Alice Guy', dates: '1873 – 1968', country: 'France / États-Unis', level: 1, bio: "Secrétaire chez Gaumont, elle tourne ses premières fictions dès 1896 puis dirige la production de la maison. Aux États-Unis, elle fonde son propre studio, la Solax. Longtemps oubliée, elle est aujourd'hui reconnue comme la première femme cinéaste.", style: ['Pionnière de la fiction', 'Direction d’acteurs naturelle', 'Expérimentations sonores précoces'], films: ['La Fée aux choux', 'La Vie du Christ (1906)', 'Falling Leaves (1912)'] },
  { id: 'melies', name: 'Georges Méliès', dates: '1861 – 1938', country: 'France', level: 1, bio: "Illusionniste et directeur de théâtre, il découvre le Cinématographe et en fait une machine à rêves. Dans son studio de Montreuil, il invente le spectacle cinématographique et les premiers effets spéciaux.", style: ['Trucages (arrêt de caméra, surimpression)', 'Décors peints', 'Féerie et fantastique'], films: ['Le Voyage dans la Lune (1902)', 'Le Voyage à travers l’impossible (1904)'] },
  { id: 'chaplin', name: 'Charlie Chaplin', dates: '1889 – 1977', country: 'Royaume-Uni / États-Unis', level: 1, bio: "Acteur, réalisateur, producteur et compositeur, il crée le personnage de Charlot, vagabond au grand cœur. Il mêle le rire, l'émotion et la critique sociale.", style: ['Burlesque et pantomime', 'Mélange de comique et de mélodrame', 'Regard sur les plus pauvres'], films: ['Le Kid (1921)', 'Les Temps modernes (1936)', 'Le Dictateur (1940)'] },
  { id: 'hitchcock', name: 'Alfred Hitchcock', dates: '1899 – 1980', country: 'Royaume-Uni / États-Unis', level: 2, bio: "Surnommé le « maître du suspense », il construit ses films comme des mécaniques de précision où le spectateur en sait souvent plus que les personnages.", style: ['Suspense plutôt que surprise', 'Le « MacGuffin »', 'Mise en scène du regard'], films: ['Fenêtre sur cour (1954)', 'Sueurs froides (1958)', 'Psychose (1960)'] },
  { id: 'kurosawa', name: 'Akira Kurosawa', dates: '1910 – 1998', country: 'Japon', level: 2, bio: "Il révèle le cinéma japonais au monde avec Rashômon. Ses films de samouraïs comme ses drames contemporains ont inspiré des cinéastes du monde entier.", style: ['Sens du mouvement et des éléments (pluie, vent)', 'Récits à points de vue multiples', 'Humanisme'], films: ['Rashômon (1950)', 'Les Sept Samouraïs (1954)', 'Ran (1985)'] },
  { id: 'varda', name: 'Agnès Varda', dates: '1928 – 2019', country: 'France', level: 1, bio: "Photographe de formation, elle réalise La Pointe courte dès 1955, film précurseur de la Nouvelle Vague. Elle passe librement de la fiction au documentaire et à l'installation.", style: ['« Cinécriture »', 'Frontière poreuse entre documentaire et fiction', 'Attention aux marges et aux anonymes'], films: ['Cléo de 5 à 7 (1962)', 'Sans toit ni loi (1985)', 'Les Glaneurs et la Glaneuse (2000)'] },
  { id: 'truffaut', name: 'François Truffaut', dates: '1932 – 1984', country: 'France', level: 1, bio: "Critique aux Cahiers du cinéma, il défend la « politique des auteurs » avant de passer à la réalisation. Les Quatre Cents Coups lance la Nouvelle Vague et le personnage d'Antoine Doinel.", style: ['Récits d’enfance et d’apprentissage', 'Amour des livres et du cinéma', 'Lyrisme discret'], films: ['Les Quatre Cents Coups (1959)', 'Jules et Jim (1962)', 'La Nuit américaine (1973)'] },
  { id: 'godard', name: 'Jean-Luc Godard', dates: '1930 – 2022', country: 'France / Suisse', level: 2, bio: "Figure la plus radicale de la Nouvelle Vague, il ne cesse de remettre en question les règles du récit, du montage et du son.", style: ['Jump cuts et ruptures', 'Citations et collages', 'Cinéma comme essai'], films: ['À bout de souffle (1960)', 'Le Mépris (1963)', 'Pierrot le Fou (1965)'] },
  { id: 'kubrick', name: 'Stanley Kubrick', dates: '1928 – 1999', country: 'États-Unis / Royaume-Uni', level: 3, bio: "Perfectionniste, il aborde un genre différent à chaque film — guerre, science-fiction, horreur, film historique — et le réinvente.", style: ['Symétrie et perspective centrale', 'Travellings et Steadicam', 'Usage marquant de la musique préexistante'], films: ['2001, l’Odyssée de l’espace (1968)', 'Barry Lyndon (1975)', 'Shining (1980)'] },
  { id: 'scorsese', name: 'Martin Scorsese', dates: 'né en 1942', country: 'États-Unis', level: 3, bio: "Figure du Nouvel Hollywood, cinéphile passionné, il filme New York, la culpabilité et la violence. Il œuvre aussi à la restauration des films du patrimoine mondial.", style: ['Montage énergique', 'Voix off et musique populaire', 'Personnages tourmentés'], films: ['Taxi Driver (1976)', 'Raging Bull (1980)', 'Les Affranchis (1990)'] },
  { id: 'campion', name: 'Jane Campion', dates: 'née en 1954', country: 'Nouvelle-Zélande', level: 3, bio: "Avec La Leçon de piano, elle devient en 1993 la première réalisatrice à recevoir la Palme d'or. Ses films explorent le désir et l'émancipation de personnages féminins.", style: ['Paysages comme états intérieurs', 'Portraits de femmes', 'Sensualité de l’image'], films: ['Un ange à ma table (1990)', 'La Leçon de piano (1993)', 'The Power of the Dog (2021)'] },
  { id: 'wong', name: 'Wong Kar-wai', dates: 'né en 1958', country: 'Hong Kong', level: 3, bio: "Cinéaste de la mémoire et des amours manquées, il compose des films très stylisés où la musique, les couleurs et les ralentis disent ce que les personnages taisent.", style: ['Ralentis et images saccadées', 'Couleurs saturées', 'Récits fragmentés'], films: ['Chungking Express (1994)', 'Happy Together (1997)', 'In the Mood for Love (2000)'] },
]

export const QUESTIONS: Question[] = [
  { id: 'q1', level: 1, theme: 'Histoire', question: 'Où a lieu la première projection publique payante du Cinématographe Lumière, le 28 décembre 1895 ?', choices: ['À Lyon, dans l’usine Lumière', 'À Paris, au Grand Café', 'À Montreuil, chez Méliès', 'À New York'], answer: 1, explanation: 'Elle se tient au Salon indien du Grand Café, boulevard des Capucines à Paris.' },
  { id: 'q2', level: 1, theme: 'Vocabulaire', question: 'Comment appelle-t-on un mouvement où la caméra pivote sur son axe sans se déplacer ?', choices: ['Un travelling', 'Un zoom', 'Un panoramique', 'Un raccord'], answer: 2, explanation: 'Dans un panoramique la caméra tourne sur elle-même ; dans un travelling elle se déplace.' },
  { id: 'q3', level: 1, theme: 'Réalisateurs', question: 'Qui a réalisé Le Voyage dans la Lune (1902) ?', choices: ['Louis Lumière', 'Georges Méliès', 'Charlie Chaplin', 'Alice Guy'], answer: 1, explanation: 'Méliès, illusionniste, est le pionnier des trucages et de la féerie au cinéma.' },
  { id: 'q4', level: 1, theme: 'Vocabulaire', question: 'Qu’est-ce que le hors-champ ?', choices: ['Une scène coupée au montage', 'Ce qui existe autour du cadre sans être montré', 'Un plan filmé en extérieur', 'Le générique de fin'], answer: 1, explanation: 'Le hors-champ est l’espace que le spectateur imagine autour de ce que le cadre montre.' },
  { id: 'q5', level: 1, theme: 'Réalisateurs', question: 'Quel film de François Truffaut lance la Nouvelle Vague en 1959 ?', choices: ['À bout de souffle', 'Cléo de 5 à 7', 'Les Quatre Cents Coups', 'Jules et Jim'], answer: 2, explanation: 'Les Quatre Cents Coups, premier long métrage de Truffaut, introduit le personnage d’Antoine Doinel.' },
  { id: 'q6', level: 2, theme: 'Histoire', question: 'Quelle caractéristique définit le néoréalisme italien ?', choices: ['Des décors de studio très stylisés', 'Des tournages en décors réels avec des acteurs non professionnels', 'L’usage systématique de la couleur', 'Des récits de science-fiction'], answer: 1, explanation: 'Rossellini ou De Sica filment dans la rue, souvent avec des non-professionnels, des sujets sociaux.' },
  { id: 'q7', level: 2, theme: 'Vocabulaire', question: 'Deux actions simultanées dans deux lieux différents sont montrées en alternance. C’est un montage…', choices: ['parallèle', 'alterné', 'elliptique', 'cut'], answer: 1, explanation: 'Le montage alterné relie des actions simultanées ; le montage parallèle rapproche des actions sans lien temporel.' },
  { id: 'q8', level: 2, theme: 'Histoire', question: 'Quel mouvement des années 1920 déforme décors et lumières pour exprimer l’angoisse ?', choices: ['Le réalisme poétique', 'L’expressionnisme allemand', 'Le néoréalisme', 'Le Free Cinema'], answer: 1, explanation: 'Le Cabinet du docteur Caligari (1920) en est le film emblématique.' },
  { id: 'q9', level: 2, theme: 'Réalisateurs', question: 'Quel cinéaste est surnommé le « maître du suspense » ?', choices: ['Orson Welles', 'Akira Kurosawa', 'Alfred Hitchcock', 'Jean Renoir'], answer: 2, explanation: 'Hitchcock distingue la surprise du suspense, où le spectateur en sait plus que le personnage.' },
  { id: 'q10', level: 3, theme: 'Vocabulaire', question: 'Que démontre l’effet Koulechov ?', choices: ['Que le son modifie la perception de l’image', 'Que le sens d’un plan dépend des plans qui l’entourent', 'Que la couleur influence l’émotion', 'Qu’un plan long paraît plus réaliste'], answer: 1, explanation: 'Un même visage neutre semble exprimer la faim, la tristesse ou le désir selon le plan qui lui est associé.' },
  { id: 'q11', level: 3, theme: 'Histoire', question: 'Quels films marquent, au milieu des années 1970, l’avènement du blockbuster ?', choices: ['Easy Rider et Bonnie and Clyde', 'Les Dents de la mer et Star Wars', 'Le Parrain et Taxi Driver', 'Toy Story et Pulp Fiction'], answer: 1, explanation: 'Les Dents de la mer (1975) puis Star Wars (1977) imposent sorties massives et grand spectacle.' },
  { id: 'q12', level: 3, theme: 'Réalisateurs', question: 'Qui est la première réalisatrice à avoir reçu la Palme d’or, en 1993 ?', choices: ['Agnès Varda', 'Jane Campion', 'Chantal Akerman', 'Kathryn Bigelow'], answer: 1, explanation: 'Jane Campion l’obtient pour La Leçon de piano.' },
  { id: 'q13', level: 3, theme: 'Vocabulaire', question: 'Une musique que les personnages ne peuvent pas entendre est dite…', choices: ['diégétique', 'in', 'extradiégétique', 'synchrone'], answer: 2, explanation: 'Elle s’ajoute au récit pour le spectateur, sans appartenir au monde de l’histoire.' },
]
