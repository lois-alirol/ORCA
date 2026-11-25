const express = require("express");
const db = require("../db");

const { dishesTable } = require("../db/schema");

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 3008;

const hbs = require("hbs");
const path = require('path');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/auth", require("./controllers/auth"));
app.get("/", (req, res) => {
    res.render("index");
})

//Dishes :
app.get("/dishes",async (req, res) => {

    const dishes = await db.select().from(dishesTable);
    res.render("Dishes/dishes", {
        dishes,
    });
})

app.get("/dishes/add", async(req,res) => {
    res.render("Dishes/addDishes")
})

app.post("/dishes/add", async(req,res) => {
    const { name , description, price} = req.body;

    await db.insert(dishesTable).values({
        name: name,
        description: description,
        price: price
    })

    res.redirect("/dishes");
})

app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})