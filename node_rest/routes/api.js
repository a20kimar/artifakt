const express = require('express')
const router = express.Router()
const dboperations = require('../dboperations')
const addData = require('../scripts/addData')

var memTest = []

router.get('/1', async (req, res) => {
    let employees = await dboperations.getEmployees()
    res.json(employees)
})
router.get('/2', async (req, res) => {
    let companies = await dboperations.getCompanies()
    res.json(companies)
})
/* Take number returns list of employees from company with id */
router.get('/3/:id', async (req, res) => {
    let companies = await dboperations.getEmployeesFromCompany(req.params.id)
    res.json(companies)
})
/* Takes number or string returns list of companies */
router.get('/4/:id', async (req, res) => {
    let companies = await dboperations.getCompany(req.params.id)
    res.json(companies)
})
/* Takes number or string returns list of employees */
router.get('/5/:id', async (req, res) => {
    let employees = await dboperations.getEmployee(req.params.id)
    res.json(employees)
})
router.get('/7/', async (req, res) => {
    let employees = await dboperations.getEmployees()
    memTest.push(employees)
    let size, items
    if (memTest.length % 10000 == 0) {
        size = (Buffer.byteLength(JSON.stringify(memTest)) / 1024).toFixed(2)
        items = memTest.length
    }
    res.json({ size: size, items: items })
})
router.get('/8/', (req, res) => {
    memTest = []
    res.json("Memory reset")
})
router.get('/', async (req, res) => {
    res.json("")
})
router.post('/add', async (req, res) => {
    const companies = req.body.companies ? req.body.companies : 0
    const employees = req.body.employees ? req.body.employees : 0
    for (let i = 0; i < companies; i++) {
        await addData.addCompany()
    }
    for (let i = 0; i < employees; i++) {
        await addData.addEmployee()
    }
    res.json("Done adding")
})
module.exports = router