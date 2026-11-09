const { sql } = require("drizzle-orm");
const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");

const moviesTable = sqliteTable("movies", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description"),
    releaseDate: integer("release_date", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

module.exports = { moviesTable };