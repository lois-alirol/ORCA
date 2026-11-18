Fiche Projet ORCA  
**Le pitch** :

ORCA (Outil de Référencement de la Carte et des Allergènes) est un outil interne pour les restaurants, qui permet de gérer les plats à la carte selon différentes catégories et les allergènes les concernant. 

**Les membres du groupe** : Loïs ALIROL, Alexandre CARTIER, Valentin DUPRAT, Pierre GUILLOT

**La stack technique choisie**:

- JavaScript : langage

- NodeJS : runtime javascript pour pouvoir exécuter sans navigateur

- Express : serveur

- Drizzle : ORM léger proche du SQL.

- SQLite : bdd, pas besoin de dépendances,  stockée dans un fichier.

- Handlebars : Moteur de Template. 

**Les entités** :  

Utilisateur(id, nom, mail, mdp, rôle) (*rôle : admin, etc)*

Carte(id, nom, description, date\_creation)

Plat (id, nom, description, prix, image) *(est-ce qu'on stocke l’image en dur dans la bdd ou on enlève la colonne image car “nom” peut déjà faire office de nom de fichier ??)*

Categorie (id, nom, description) *(catégorie du plat : épicé, vegan…)*

Allergène (id, nom)

**Les relations** : 

La carte contient plusieurs plats (1 \- N)

Un plat appartient à plusieurs cartes (1 \- N)

Les plats peuvent appartenir à plusieurs catégories (N \- N)

Les plats ont aucun ou plusieurs allergènes (N \- N)

**Les entités A et B**: Plat & Catégorie (voir plus si temps nécessaire) 

**Le contenu du seed** (D4) :

Utilisateur(0, “John”, “johndoe@mail.com”, 1234, admin)

Carte(0, “Carte d’été”, “Carte composée de plat estivales”, 25/6/2026)

Plat (0, “Hamburger”, “Hamburger boeuf avec cheddar, tomates et oignons”, 9.50, “hamburger.png”)

Plat (1, “Pizza”, “Pizza chorizo, base tomate, mozzarella, poivrons”, 11.50, “pizza.jpg”)

Plat (2, “Crevettes”, “Des crevettes de Bretagne”, 5.60, “crevette.png”)

Plat (3, “Cookie aux cacahuètes”, “Attention”, 2.70, “cookie.png”)

Catégorie (0, “plat”, “plat de résistance”)

Catégorie (1, “dessert”, “dessert pour bien finir le repas”)

Catégorie (2, “entrée”, “entrée pour bien commencer le repas”)

Allergène (0, “Arachides ”)

Allergène (1, “Fruits à coque  ”)

Allergène (2, “Lait ”)

**Ce qui est mis en avant** sur la page d'accueil (F13 et F14):

- Plat du jour (à voir)

- Les différentes cartes (à voir)

**Gestionning** : GitHub Project