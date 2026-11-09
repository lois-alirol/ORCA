require("dotenv").config();
const { drizzle } = require("drizzle-orm/libsql");

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;