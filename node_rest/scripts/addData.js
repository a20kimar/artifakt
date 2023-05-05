var connection = require('../dbconnect')
const mysql = require('mysql')
const generateData = require('./generatedata')

/* Script to add employees to the database */

const addEmployee = async () => {
    const names = generateData.names()
    const area = generateData.area()
    const position = generateData.position()
    const birthday = generateData.birthday()
    const gender = generateData.gender()
    const philhealth = generateData.philhealth()
    const hiringdate = generateData.hiringdate()
    const pagibid = generateData.pagibid()
    const tin = generateData.tin()
    const ssid = generateData.ssid()
    const company = await generateData.company()
    const rate = generateData.rate()
    const status = generateData.status()

    let sql = `INSERT INTO Employees(fName, lName, area, position, birthday, gender, philhealth, hiringdate, pagibig, rate, status, company, tin, ssid) VALUES('${names[0]}', '${names[1]}', '${area}', '${position}', '${birthday}', ${gender}, '${philhealth}', '${hiringdate}', '${pagibid}', '${rate}', ${status}, ${company}, '${tin}', '${ssid}')`
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

const addCompany = () => {
    const rate = generateData.rate()
    const companyName = generateData.generateCompanyName()
    const code = generateData.generateCode(companyName)


    let sql = `INSERT INTO Companies(name, rate, code) VALUES('${companyName}', ${rate}, '${code}')`
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
    addEmployee: addEmployee,
    addCompany: addCompany
}