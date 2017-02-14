# T.A.G.S
**Système d'étiquette pour joueurs**

## Fonctionalités basiques
- Chaque joueurs peux prendre entre 0 et N TAGS
- Un joueur peut créer des tags inéxistants
- Un tag référence tous les joueurs le possédant

## Types de T.A.G.S
### TAGS
Tous les tags étant crées directement par des humains.
- **Tags Normaux** - statut de base, pouvant être créer par n'importe qui.
- **Tags Officiel** - statut pour les tags désignant officiellement un gameplay. (ex : Interception)
- **Tags Compétence** - statut pour les tags désignant une compétence officielle. (ex : Interception Lv1)
- **Tags Récompense** - statut pour les tags désignant une récompense officielle. (ex : Ruban bravoure)

### TAGS SPECIAUX
Les tags étant crées de façon automatique par JULIET
- **Tags Vaisseaux** - désignant les propriétaire d'un vaisseau donné
- **Tags Rang** - désignant les détenteurs d'un rang donné

Les tags peuvent également être **restreint**, indiquant qu'ils ne peuvent pas être pris sans droits supplémentaires. (matérialisé par un liseret rouge)
Les tags spéciaux sont globalement tous restreints.

## Hiearchie des T.A.G.S
Contrairement à la V2, la V3 permet de hiearchiser les T.A.G.S entre eux. Ainsi, deux propriétés hiearchiques facultatives existent actuellement :
- `Parent` permet d'indiquer la parenté d'un T.A.G. Et ce afin de créer un arbre hiearchique et de "catégoriser" les tags entre eux.

**Exemple :** 
Soit le tag officiel "Interception" ayant comme parent "Militaire", 
et le tag de compétence "Interception lv1" ayant comme parent "Interception".

Une fois sur la page du T.A.G "Interception", il sera affiché qu'il est enfant de "Militaire", donnant une indiquation sur sa vocation, mais surtout, une liste de ses enfants sera affichés, permettant de très rapidement naviguer entre les différents T.A.G.S se rapportant à l'interception.
**cette fonctioanlité est purement cosmétique**
**cette fonctionalité fonctionne mais la liste des enfants d'un tag n'est pas encore affichée**

- `Droits depuis` permet que les joueur possédant le tag indiqué obtiennent le droit `USER_CAN_ADMIN_TAG` sur le tag. 

**Exemple :**
Soit le tag "Explorateur lv2" ayant indiqué comme `Droit depuis` le tag "Explorateur LV4"
Celà signifie que tous les joueurs possédant "Explorateur LV4" ont `USER_CAN_ADMIN_TAG` sur "Explorateur Lv2". Leur permettant donc d'éditer et d'ajouter/enlever des joueurs à Explorateur LV2.

`Droits depuis` est donc particulièrement utile pour donner la possibilité à certaines personne d'affecter certains tags restreints à d'autre joueurs.

*A terme, `Droits depuis` pourra être renseigné en tant que combinaison de plusieurs tags*


# Pages
## Index tag
Présente une liste de tous les T.A.G.S ayant un moins 1 joueur les possédants, 
plus tous les T.A.G.S spéciaux.
- Possibilité de filtrer les T.A.G.S par noms
- Possibilité de filtrer les T.A.G.S par type
- Affichage du nombre de T.A.G.S correspondant
- Lien vers la page "Single T.A.G" en clickant sur un T.A.G

## Single tag
Présente les informations sur un tag en particulier.
- Présente les joueurs possédant le T.A.G
- Présente le type de T.A.G (spécial ou non, officiel/competence/recompense et restreint ou non).
- Propose un bouton pour ajouter ce tag à sa liste personelle.

Les joueurs possédant les droits d'administration sur un T.A.G (`USER_CAN_ADMIN_TAG`) donné peuvent :
- Changer le nom du T.A.G
    - en cas de doublon avec un nom existant, une option de "transfert" est proposée, transférant tous les joueurs de l'ancien T.A.G vers la nouvelle appélation, tout en supprimant les doublons.
- Ajouter des joueurs à ce T.A.G
- Modifier le type de T.A.G (Normal/Officiel/Recompense/Competence).
- Passer le T.A.G en restreint/libre
- Supprimer le T.A.G
- Modifier Parent/Droit Depuis (cf Hiearchie des T.A.G.S)

## User Tag
Présente les tags personel d'un joueur en particulier (souvent du joueur actuellement connecté)
- Présente la liste des T.A.G.S affectés au joueur courant.
- ... Même fonctionalités que Index Tag.

Les joueurs possédant les droits `USER_CAN_ADMIN_TAGS` sur l'utilisateur courant peuvent :
- Affecter/Désaffecter des T.A.G.S à l'utilisateur
