const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ message: "Hello world" })

})

router.post('/', (req, res) => {

})

module.exports = router