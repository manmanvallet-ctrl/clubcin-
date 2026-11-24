# Directions visuelles — Club Ciné

> **Direction retenue (24/11/2026) : la charte « programme de cinéma d'art et d'essai »** (`docs/charte/`), conçue par Manon. Papier crème, bandeau bordeaux, titres en Source Serif 4 (voir « Polices » plus bas), touches d'or, avec un thème sombre « Salle » pour la projection. Elle reprend le papier de la piste A, mais sur le ton d'un cinéma de quartier plutôt que d'une feuille de tournage.
> Appliquée à l'appli : `avant-apres.png`, `salle.png`, `croquis-deux-themes.png`. Les trois pistes ci-dessous restent comme archive de la recherche.

Essai du 23/11/2026 : trois directions vraiment différentes pour le même écran (accueil élève), à comparer avec l'interface actuelle.

- `actuel.png` : l'interface actuelle (rouge velours sur noir).
- `comparaison.png` : les trois propositions côte à côte.
- `maquettes.html` : la maquette, à ouvrir dans un navigateur.

| | A · Pellicule | B · Riso | C · Montage |
|---|---|---|---|
| Idée | Feuille de service et script tapé à la machine | Affiche de festival imprimée en deux encres | Table de montage d'un logiciel vidéo |
| Couleurs | Crème, encre brune, rouge tampon | Papier, rose fluo, bleu, jaune | Graphite, ambre, bleu de piste |
| Polices | Courier Prime + Libre Franklin | Anton + Space Grotesk | Inter Tight + JetBrains Mono |
| Les 6 étapes | Images d'une bande de pellicule | Pastilles cochées | Clips sur une piste, avec tête de lecture |
| Ton | Artisanal, « on prépare un tournage » | Énergique, lycéen, festival | Technique, « on est des pros » |

Toutes les paires texte / fond dépassent un contraste de 4,5 ; boutons et onglets font au moins 44 px.

## Sources d'inspiration

- [ekmas/neobrutalism-components](https://github.com/ekmas/neobrutalism-components) (MIT) : bordures épaisses et ombres franches (B).
- Dépôts GitHub en style risographie, « zine » et « dossier tamponné » (recherche `risograph css`, `grain texture css`) : deux encres décalées (B), papier et tampons (A).
- Tendances 2026 : typographie surdimensionnée, textures tactiles en réaction à l'uniformité des interfaces générées par IA ([Bubble](https://bubble.io/blog/web-design-trends/), [Figma](https://www.figma.com/resource-library/web-design-trends/)).
- Le métier lui-même : le format des scénarios (Courier, « INT. LYCÉE — JOUR »), la pellicule perforée, les pistes et le timecode des logiciels de montage.

## Polices (choix du 24/11/2026)

Georgia et Avenir, prévues par la charte, n'existent ni sur Android ni sur Chromebook. Comparaison dans `polices.png` ; choix : **option 2, Source Serif 4 (titres) + Nunito Sans (texte)**, rendu dans `polices-choisies.png`. Les deux sont sous licence libre OFL et hébergées dans l'appli (`app/src/assets/fonts/`, environ 80 Ko) : aucun appel à Google.

## Reste à faire

- Trancher le nom : « Club Ciné » ou « Ciné-club ».
