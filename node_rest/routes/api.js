const express = require('express')
const router = express.Router()
const dboperations = require('../dboperations')
const addData = require('../scripts/addemployees')



router.get('/1/:id', async (req, res) => {
    let employees = await dboperations.getEmployee(req.params.id)
    res.json(employees)
})
router.get('/2', async (req, res) => {
    let employees = await dboperations.getEmployees()
    res.json(employees)
})
router.get('/3', async (req, res) => {
    let companies = await dboperations.getCompanies()
    res.json(companies)
})
router.get('/4/:id', async (req, res) => {
    let companies = await dboperations.getCompany(req.params.id)
    res.json(companies)
})
router.get('/5/:id', async (req, res) => {
    let companies = await dboperations.getEmployeesFromCompany(req.params.id)
    res.json(companies)
})
router.get('/', async (req, res) => {
    res.json("/1/id = Get employee with id; /2/ = Get all employees; /3/ = Get all companies; /4/id = Get company with ID; /5/id = Get employees from company with ID;")
})
router.get('/add', async (req, res) => {
    for (let i = 0; i < 250; i++) {
        const addEmployee = await addData.addEmployee();
        //const addCompany = await addData.addCompany();
    }

    res.json("Done adding")
})
module.exports = router