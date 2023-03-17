var connection = require('./dbconnect')
const mysql = require('mysql')

// Returns an array of employee(s)

const getEmployees = (id) => {
    if (id != null && id !== '') {
        let sql = `SELECT * from Employees WHERE id=${mysql.escape(id)}`
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, res) => {
                if (error) {
                    console.error("Error: ", error)
                    reject(error)
                    return
                }
                resolve(res);
            })
        })
    } else {
        let sql = `SELECT * from Employees`
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, res) => {
                if (error) {
                    console.error("Error: ", error)
                    reject(error)
                    return
                }
                resolve(res)
            })
        })
    }
}

module.exports = {
    getEmployees: getEmployees
}