const express = require('express')
const router = express.Router()
const dboperations = require('../dboperations')
const addEmployees = require('../scripts/addemployees')



// All Employees route
router.get('/', async (req, res) => {
    let employees = await dboperations.getEmployees()
    let result = await addEmployees.addEmployee();
    res.json(result)
})

module.exports = router