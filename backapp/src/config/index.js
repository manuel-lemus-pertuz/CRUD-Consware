require('dotenv').config()
const config = {
    dbuser: process.env.DB_USER || 'user',  
    dbpass: process.env.DB_PASSWORD || '1234',
    dbhost: process.env.DB_HOST || 'localhost',
    dbname: process.env.DB_NAME || 'db',
    dbport: process.env.DB_PORT || '5432',
}

module.exports = config