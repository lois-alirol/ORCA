const { sql } = require("drizzle-orm");
const { sqliteTable, integer, text, real } = require("drizzle-orm/sqlite-core");

const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: text("role").notNull().default("user"),
});

const restaurantsTable = sqliteTable("restaurants", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    address: text("address").notNull(),
    description: text("description"),
    image: text("image"),
});

const menusTable = sqliteTable("menus", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    restaurantId: integer("restaurant_id")
        .notNull()
        .references(() => restaurantsTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

const dishesTable = sqliteTable("dishes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
    price: real("price").notNull(),
    image: text("image"),
});

const categoriesTable = sqliteTable("categories", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
});

const allergensTable = sqliteTable("allergens", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

const menuDishesTable = sqliteTable("menu_dishes", {
    menuId: integer("menu_id")
        .notNull()
        .references(() => menusTable.id, { onDelete: "cascade" }),
    dishId: integer("dish_id")
        .notNull()
        .references(() => dishesTable.id, { onDelete: "cascade" }),
});

const dishCategoriesTable = sqliteTable("dish_categories", {
    dishId: integer("dish_id")
        .notNull()
        .references(() => dishesTable.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
        .notNull()
        .references(() => categoriesTable.id, { onDelete: "cascade" }),
});

const dishAllergensTable = sqliteTable("dish_allergens", {
    dishId: integer("dish_id")
        .notNull()
        .references(() => dishesTable.id, { onDelete: "cascade" }),
    allergenId: integer("allergen_id")
        .notNull()
        .references(() => allergensTable.id, { onDelete: "cascade" }),
});

module.exports = {
    usersTable,
    restaurantsTable,
    menusTable,
    dishesTable,
    categoriesTable,
    allergensTable,
    menuDishesTable,
    dishCategoriesTable,
    dishAllergensTable,
};