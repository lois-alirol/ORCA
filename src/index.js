const express = require("express");
const db = require("../db");

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

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})