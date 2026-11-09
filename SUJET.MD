# FICHE PROJET

## Le pitch:
ORCA (Outil de Référencement de la Carte et des Allergènes) est un outil interne pour les restaurants, qui permet de gérer les plats à la carte selon différentes catégories et les allergènes les concernant.
Les membres du groupe : Loïs ALIROL, Alexandre CARTIER, Valentin DUPRAT
La stack technique choisie: JavaScript, NodeJS, Express

## Les entités :  
- Utilisateur (id, nom, mail, mdp, rôle)
- Carte(id, nom, description, date_creation)
- Plat (id, nom, description, prix)
- Categorie (id, nom, description)
- Allergène (id, nom)

## Les relations :
- La carte contient plusieurs plats (1-N)
- Les plats appartiennent à une seule catégorie (N-1)
- Les plats ont aucun ou plusieurs allergènes (N-N)

## Les entités A et B : 
Plat & Catégorie (voir plus si temps nécessaire)

## Le contenu du seed (D4) :

TBD


## Mis en avant sur la page d'accueil :

- Plat du jour
- Les différentes cartes
