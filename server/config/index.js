/* Username match pattern */
const illUsername = /\W/

/* Reserver words cannot be used as username */
const reservedWords = [
    "home",
    "about",
    "account",
    "blog"
]

module.exports = { illUsername, reservedWords }