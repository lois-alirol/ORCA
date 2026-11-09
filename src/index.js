const express = require("express");
const db = require("./db");
const { moviesTable} = require("./db/schema");

const app = express();
const PORT = 3008;

app.get("/", async (req, res) => {
    const movies = await db.select().from(moviesTable)
    let content = "";

    for (const movie of movies) {
        content += `- ${movie.id}: ${movie.title} - ${movie.description} - ${movie.releaseDate}<br>`;
    }

    res.send(content);
})

app.post("/", async (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})