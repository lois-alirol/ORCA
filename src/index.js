const express = require("express");
const db = require("../db");

const { dishesTable } = require("../db/schema");

const app = express();
const PORT = process.env.APP_PORT || 3008;

const hbs = require("hbs");
const path = require('path');
const session = require("express-session");
const passport = require('passport');
const isAuthenticated = require("./middlewares/auth");

const SQLiteStore = require('connect-sqlite3')(session);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, "..", "db") })
}));

app.use(passport.authenticate('session'));

app.get("/", isAuthenticated, (req, res) => {
    res.render("index");
})

app.use("/auth", require("./controllers/auth"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})