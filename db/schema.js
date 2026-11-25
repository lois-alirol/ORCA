const { sql } = require("drizzle-orm");
const {
    check,
    index,
    integer,
    primaryKey,
    sqliteTable,
    text,
    unique,
} = require("drizzle-orm/sqlite-core");

const usersTable = sqliteTable(
    "users",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        passwordHash: text("password_hash").notNull(),
        role: text("role").notNull().default("staff"),
    },
    (table) => [
        check("users_role_check", sql`${table.role} in ('admin', 'manager', 'staff')`),
    ],
);

const menusTable = sqliteTable("menus", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    createdAt: text("created_at").notNull(), // Date ISO : YYYY-MM-DD
});

const dishesTable = sqliteTable(
    "dishes",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        name: text("name").notNull(),
        description: text("description").notNull().default(""),
        priceCents: integer("price_cents").notNull(),
    },
    (table) => [
        check("dishes_price_cents_nonnegative", sql`${table.priceCents} >= 0`),
    ],
);

const categoriesTable = sqliteTable("categories", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    description: text("description").notNull().default(""),
});

const allergensTable = sqliteTable("allergens", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

const dishImagesTable = sqliteTable(
    "dish_images",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        dishId: integer("dish_id")
            .notNull()
            .references(() => dishesTable.id, { onDelete: "cascade" }),
        filePath: text("file_path").notNull(),
        altText: text("alt_text"),
        position: integer("position").notNull().default(0),
    },
    (table) => [
        unique("dish_images_dish_file_unique").on(table.dishId, table.filePath),
        check("dish_images_position_nonnegative", sql`${table.position} >= 0`),
    ],
);

const menuDishesTable = sqliteTable(
    "menu_dishes",
    {
        menuId: integer("menu_id")
            .notNull()
            .references(() => menusTable.id, { onDelete: "cascade" }),
        dishId: integer("dish_id")
            .notNull()
            .references(() => dishesTable.id, { onDelete: "cascade" }),
        position: integer("position").notNull().default(0),
    },
    (table) => [
        primaryKey({ columns: [table.menuId, table.dishId] }),
        check("menu_dishes_position_nonnegative", sql`${table.position} >= 0`),
        index("menu_dishes_dish_id_idx").on(table.dishId),
    ],
);

const dishCategoriesTable = sqliteTable(
    "dish_categories",
    {
        dishId: integer("dish_id")
            .notNull()
            .references(() => dishesTable.id, { onDelete: "cascade" }),
        categoryId: integer("category_id")
            .notNull()
            .references(() => categoriesTable.id, { onDelete: "cascade" }),
    },
    (table) => [
        primaryKey({ columns: [table.dishId, table.categoryId] }),
        index("dish_categories_category_id_idx").on(table.categoryId),
    ],
);

const dishAllergensTable = sqliteTable(
    "dish_allergens",
    {
        dishId: integer("dish_id")
            .notNull()
            .references(() => dishesTable.id, { onDelete: "cascade" }),
        allergenId: integer("allergen_id")
            .notNull()
            .references(() => allergensTable.id, { onDelete: "cascade" }),
    },
    (table) => [
        primaryKey({ columns: [table.dishId, table.allergenId] }),
        index("dish_allergens_allergen_id_idx").on(table.allergenId),
    ],
);

module.exports = {
    usersTable,
    menusTable,
    dishesTable,
    categoriesTable,
    allergensTable,
    dishImagesTable,
    menuDishesTable,
    dishCategoriesTable,
    dishAllergensTable,
};
