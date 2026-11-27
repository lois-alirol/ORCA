const { randomBytes, scryptSync } = require("node:crypto");

function hashPassword(password) {
    const salt = randomBytes(16);
    const passwordHash = scryptSync(password, salt, 64);

    return `scrypt$${salt.toString("hex")}$${passwordHash.toString("hex")}`;
}

module.exports = hashPassword;