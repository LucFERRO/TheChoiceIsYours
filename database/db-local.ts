const Pool = require('pg').Pool

const pool = new Pool({
    host: "localhost",
    user: "neo",
    port: 5432,
    password: "neoneo",
    database: "TheChoiceIsYours"
})

module.exports = pool