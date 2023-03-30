if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const sql = require('mysql')


const config = sql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 3306,
})

module.exports = config