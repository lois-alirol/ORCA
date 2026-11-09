const express = require("express");
const db = require("../db");
const { moviesTable} = require("../db/schema");

const app = express();
const PORT = 3008;

app.get("/", (req, res) => {
    res.send("eee");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})