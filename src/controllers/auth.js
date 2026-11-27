const express = require("express");
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../../db');
const {usersTable} = require("../../db/schema");
const {eq} = require("drizzle-orm");

// on configure passport.js pour utiliser une connexion avec email et mot de passe
passport.use(
    new LocalStrategy(
        // le champ mail du formulaire remplace le champ username par défaut
        { usernameField: "email" },

        // executée lors d'une tentative de connexion
        async function verify(email, password, cb) {
            let user;

            try {
                // on cherche l'utilisateur depuis la bdd (ca explique la fonction asynchrone)
                user = await db.select()
                    .from(usersTable)
                    .where(eq(usersTable.email, email))
                    .get();
            } catch (err) {
                return cb(err);
            }

            // pas de user trouvé
            if (!user) {
                return cb(null, false);
            }

            // On récupère le sel (morceau aléatoire pour ne pas qu'un dictionnaire de hashage
            // puisse trouver notre mdp et le hash du mot de passe enregistré
            const [algo, salt, storedHash] = user.passwordHash.split("$");

            // on chiffre le mdp envoyé depuis le formulaire avec le meme sel que le mot de passe enregistré
            crypto.scrypt(password, Buffer.from(salt, "hex"), 64, (err, hash) => {
                // erreur pdt le chifrrement
                if (err) return cb(err);

                // hash du mot de passe stocké différent de celui hashé a l'instant
                if (!crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), hash)) {
                    return cb(null, false);
                }

                // email et mdp correcte, on renvoie les infos de l'utilisateurs
                return cb(null, {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
            });
        },
    ),
);

router.get("/sign-in", (req, res) => {
    res.render("auth/signIn");
});

router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/sign-in'
}));

// définit les informations de l'utilisateur à enregistrer dans la session
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        // On enregistre uniquement l'id et le username de l'utilisateur
        cb(null, { id: user.id, username: user.username });
    });
});

// Récupère les informations de l'utilisateur depuis la session
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = router;