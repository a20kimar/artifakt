const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

router.get('/', (req, res) => {
    res.render("index");
})

router.get('/rest', async (req, res) => {
    const info = []
    res.render("index", {
        info: info
    });
})

router.post('/measure', async (req, res) => {
    let info = [];
    if (req.body.apiType > 0) {
        info = await measure.rest(req.body.endpoint, req.body.iterations)
    } else {
        /* GraphQL fetch */
    }
    res.render("index", {
        info: info
    });
})

router.post('/', (req, res) => {

})

module.exports = router