require("dotenv").config();
const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
    dialect: "sqlite",
    schema: "./db/schema.js",
    out: "./db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});