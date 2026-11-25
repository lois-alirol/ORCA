const express = require("express");
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../../db');
const {usersTable} = require("../../db/schema");
const {eq} = require("drizzle-orm");

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        function verify(email, password, cb) {
            let row;

            try {
                row = db
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.email, email))
                    .get();
            } catch (err) {
                return cb(err);
            }

            if (!row) {
                return cb(null, false, {message: "Incorrect username or password.",});
            }

            const [saltHex, hashHex] = row.passwordHash.split("$");

            crypto.scrypt(
                password,
                Buffer.from(saltHex, "hex"),
                64,
                function (err, hashedPassword) {
                    if (err) return cb(err);

                    const storedHash = Buffer.from(hashHex, "hex");

                    if (!crypto.timingSafeEqual(storedHash, hashedPassword)) {
                        return cb(null, false, {
                            message: "Incorrect username or password.",
                        });
                    }

                    return cb(null, {
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        role: row.role,
                    });
                },
            );
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

module.exports = router;