const db = require("./index");

const {
    usersTable,
    menusTable,
    dishesTable,
    categoriesTable,
    allergensTable,
    dishImagesTable,
    menuDishesTable,
    dishCategoriesTable,
    dishAllergensTable,
} = require("./schema.js");

const hashPassword = require("../src/util/password");

async function seed () {
    await db.transaction(async (tx) => {
        await tx.insert(usersTable)
            .values({
                id: 0,
                name: "John",
                email: "johndoe@mail.com",
                passwordHash: hashPassword("1234"),
                role: "admin",
            })
            .onConflictDoNothing();

        await tx.insert(menusTable)
            .values({
                id: 0,
                name: "Carte d’été",
                description: "Carte composée de plats estivaux",
                createdAt: "2026-06-25",
            })
            .onConflictDoNothing();

        await tx.insert(dishesTable)
            .values([
                {
                    id: 0,
                    name: "Hamburger",
                    description: "Hamburger bœuf avec cheddar, tomates et oignons",
                    priceCents: 950,
                },
                {
                    id: 1,
                    name: "Pizza",
                    description: "Pizza chorizo, base tomate, mozzarella, poivrons",
                    priceCents: 1150,
                },
                {
                    id: 2,
                    name: "Crevettes",
                    description: "Des crevettes de Bretagne",
                    priceCents: 560,
                },
                {
                    id: 3,
                    name: "Cookie aux cacahuètes",
                    description: "Attention : contient des cacahuètes.",
                    priceCents: 270,
                },
            ])
            .onConflictDoNothing();

        await tx.insert(categoriesTable)
            .values([
                {id: 0, name: "plat", description: "Plat de résistance"},
                {id: 1, name: "dessert", description: "Dessert pour bien finir le repas"},
                {id: 2, name: "entrée", description: "Entrée pour bien commencer le repas"},
                {id: 3, name: "boisson", description: "Boisson pour bien profiter du repas"},
            ])
            .onConflictDoNothing();

        await tx.insert(allergensTable)
            .values([
                {id: 0, name: "Arachides"},
                {id: 1, name: "Fruits à coque"},
                {id: 2, name: "Lait"},
                {id: 3, name: "Crustacés"},
            ])
            .onConflictDoNothing();

        await tx.insert(dishImagesTable)
            .values([
                {id: 0, dishId: 0, filePath: "hamburger.png", altText: "Hamburger"},
                {id: 1, dishId: 1, filePath: "pizza.jpg", altText: "Pizza"},
                {id: 2, dishId: 2, filePath: "crevette.png", altText: "Crevettes"},
                {id: 3, dishId: 3, filePath: "cookie.png", altText: "Cookie aux cacahuètes"},
            ])
            .onConflictDoNothing();

        await tx.insert(menuDishesTable)
            .values([
                {menuId: 0, dishId: 0, position: 0},
                {menuId: 0, dishId: 1, position: 1},
                {menuId: 0, dishId: 2, position: 2},
                {menuId: 0, dishId: 3, position: 3},
            ])
            .onConflictDoNothing();

        await tx.insert(dishCategoriesTable)
            .values([
                {dishId: 0, categoryId: 0},
                {dishId: 1, categoryId: 0},
                {dishId: 2, categoryId: 2},
                {dishId: 3, categoryId: 1},
            ])
            .onConflictDoNothing();

        await tx.insert(dishAllergensTable)
            .values([
                {dishId: 0, allergenId: 2},
                {dishId: 1, allergenId: 2},
                {dishId: 2, allergenId: 3},
                {dishId: 3, allergenId: 0},
            ])
            .onConflictDoNothing();
    });
}

async function resetDatabase() {
    await db.delete(dishImagesTable);
    await db.delete(dishCategoriesTable);
    await db.delete(dishAllergensTable);
    await db.delete(menuDishesTable);

    await db.delete(dishesTable);
    await db.delete(categoriesTable);
    await db.delete(allergensTable);
    await db.delete(usersTable);

    await seed();

    console.log("Base de données remplie");
}

resetDatabase();