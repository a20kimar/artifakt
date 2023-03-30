var connection = require('./dbconnect')
const mysql = require('mysql')

// Returns an array of employee(s)

const getEmployee = (id) => {
    if (id == null || id == '' || typeof id === 'undefined') {
        console.error("Id not correct format, id: " + id)
        return
    }
    let sql = `SELECT * from Employees WHERE id=${mysql.escape(id)}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) {
                console.error("Error: ", error)
                reject(error)
                return
            }
            resolve(res[0]);
        })
    })
}
const getEmployeesInCompany = (companyId) => {
    if (companyId == null || companyId == '' || typeof companyId === 'undefined') {
        console.error("Id not correct format, id: " + id)
        return
    }
    let sql = `SELECT * from Employees WHERE company=${mysql.escape(companyId)}`
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

}
const getEmployees = () => {
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

const getCompany = (id) => {
    if (id == null || id == '' || typeof id === 'undefined') {
        console.error("Id not correct format, id: " + id)
        return
    }
    let sql = `SELECT * from Companies where id=${mysql.escape(id)}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) {
                console.error("Error: ", error)
                reject(error)
                return
            }
            resolve(res[0])
        })
    })
}
const getCompanies = () => {
    let sql = `SELECT * from Companies`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) {
                console.error("Error: ", error)
                reject(error)
                return
            }
            console.log(res)
            resolve(res)
        })
    })
}

module.exports = {
    getEmployees: getEmployees,
    getEmployee: getEmployee,
    getEmployeesInCompany: getEmployeesInCompany,
    getCompanies: getCompanies,
    getCompany: getCompany
}