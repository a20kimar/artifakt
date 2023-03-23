const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

router.get('/', (req, res) => {
    res.render("index");
})

router.get('/rest', async (req, res) => {

    const info = await measure.rest();
    console.info(info)
    res.render("index", {
        info: info
    });
})

router.post('/', (req, res) => {

})

module.exports = router