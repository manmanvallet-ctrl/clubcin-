# Directions visuelles — Club Ciné

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

## À faire une fois la direction choisie

- Héberger les polices dans l'appli (pas de Google Fonts : public mineur, RGPD).
- Noter la direction retenue ici et dans `CLAUDE.md`, puis l'appliquer à `app/src/index.css` sur une branche, avec captures avant / après.
