var connection = require('./dbconnect')
const mysql = require('mysql')

// Returns an array of employee(s)

/* Can take number or string as ID, number returns a employee with that ID, string search for employees with name containing id */
const getEmployee = (id) => {
    if (id == null || id == '' || typeof id === 'undefined') {
        console.error("Id not correct format, id: " + id)
        return
    }
    let sql = ""
    if (isNaN(id)) {
        id = "%" + id + "%"
        sql = `SELECT * from Employees WHERE fname LIKE ${mysql.escape(id)}`
    } else {
        sql = `SELECT * from Employees WHERE id=${mysql.escape(id)}`
    }
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
    let sql = ""
    if (isNaN(id)) {
        id = "%" + id + "%"
        sql = `SELECT * from Companies WHERE name LIKE ${mysql.escape(id)}`
    } else {
        sql = `SELECT * from Companies WHERE id=${mysql.escape(id)}`
    }
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
const getCompanies = () => {
    let sql = `SELECT * from Companies`
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

const getEmployeesFromCompany = (companyId) => {

    if (companyId == null || companyId == '' || typeof companyId === 'undefined') {
        console.error("Id not correct format, id: " + id)
        return
    }
    let sql = `SELECT * from Employees where company=${mysql.escape(companyId)}`
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

module.exports = {
    getEmployees: getEmployees,
    getEmployee: getEmployee,
    getEmployeesInCompany: getEmployeesInCompany,
    getCompanies: getCompanies,
    getCompany: getCompany,
    getEmployeesFromCompany: getEmployeesFromCompany
}