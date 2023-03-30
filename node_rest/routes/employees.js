const express = require('express')
const router = express.Router()
const dboperations = require('../dboperations')
const addEmployees = require('../scripts/addemployees')



// All Employees route
router.get('/1', async (req, res) => {
    let employees = await dboperations.getEmployees(1)
    res.json(employees)
})
router.get('/2', async (req, res) => {
    let employees = await dboperations.getEmployees()
    res.json(employees)
})
router.get('/3', async (req, res) => {
    let employees = await dboperations.getEmployees()
    let result = await addEmployees.addEmployee();
    res.json(result)
})
router.get('/4', async (req, res) => {
    let employees = await dboperations.getEmployees()
    let result = await addEmployees.addEmployee();
    res.json(result)
})
router.get('/5', async (req, res) => {
    let employees = await dboperations.getEmployees()
    let result = await addEmployees.addEmployee();
    res.json(result)
})
router.post('/', async (req, res) => {

})
module.exports = router