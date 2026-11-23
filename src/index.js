const express = require("express");
const db = require("../db");

const { dishesTable } = require("../db/schema");

const app = express();
const PORT = 3008;

const hbs = require("hbs");
const path = require('path');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/dishes",async (req, res) => {

    const dishes = await db.select().from(dishesTable);
    res.render("Dishes/dishes", {
        dishes,
    });
})
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})