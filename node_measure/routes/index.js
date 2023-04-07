const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

let data = [];

router.get('/', (req, res) => {
    const info = []
    res.render("index", {
        info: info
    });
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
        info = await measure.rest(req.body.endpoint, req.body.iterations, req.body.id)
    } else {
        info = await measure.graphql(req.body.endpoint, req.body.iterations, req.body.id)
    }
    res.render("index", {
        info: info
    });
})


router.post('/download', async (req, res) => {
    data.push(JSON.parse(req.body.data))
    res.json(data)
})

router.post('/', (req, res) => {

})

module.exports = router