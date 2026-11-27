const express = require("express");
const db = require("../../db");
const {dishesTable} = require("../../db/schema");
const router = express.Router();

router.get("/dishes",async (req, res) => {

    const dishes = await db.select().from(dishesTable);
    res.render("Dishes/dishes", {
        dishes,
    });
})

router.get("/dishes/add", async(req,res) => {
    res.render("Dishes/addDishes")
})

router.post("/dishes/add", async(req,res) => {
    const { name , description, price} = req.body;

    await db.insert(dishesTable).values({
        name: name,
        description: description,
        priceCents: price
    })

    res.redirect("/dishes");
})