const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

var data = []
var dataset = []

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
    data = data.concat(info)
    dataset.push(info)
    res.render("index", {
        info: info
    });
})


router.post('/chart', async (req, res) => {
    res.render("chart", {
        data: dataset
    });
})
router.get('/download', (req, res) => {
    for (let i = 0; i < data.length; i++) {
        data[i].time = data[i].time.split(" ")[0]
        data[i].id = i
    }
    res.json(data)
})


router.post('/', (req, res) => {

})

module.exports = router