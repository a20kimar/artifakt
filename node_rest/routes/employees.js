const express = require('express')
const router = express.Router()
const dboperations = require('../dboperations')



// All Employees route
router.get('/', async (req, res) => {
    let employees = await dboperations.getEmployees()
    res.json(employees)
})

module.exports = router