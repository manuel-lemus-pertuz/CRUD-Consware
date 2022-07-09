const { Pool } = require('pg');
const platosModel = require("./platos")
const config = require("../config")
const pool = new Pool({
    user: config.dbuser,
    host: config.dbhost,
    database: config.dbname,
    password: config.dbpass,
    port: config.dbport,
})

module.exports = {
    pool,
    platosModel,
}
