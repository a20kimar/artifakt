const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

var data = []
var dataset = []

router.get('/', (req, res) => {
    res.render("index", {
    });
})

router.get('/rest', (req, res) => {
    res.render("index", {
    });
})

router.post('/measure', async (req, res) => {
    /* results is needed to display the table */
    let results = []
    /* Form data */
    endpoint = req.body.endpoint
    iterations = parseInt(req.body.iterations)
    apiType = req.body.apiType
    overfetching = req.body.overfetching ? true : false
    underfetching = req.body.underfetching ? true : false
    if (req.body.resetdata) {
        dataset = []
    }
    /* Endpoint 6 = measure all endpoints */
    if (endpoint == 6) {
        /* Apitype 2 = measure both APIs */
        if (apiType == 1 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < iterations; j++) {
                    let result = await measure.rest(i + 1, req.body.id)
                    results.push(result)
                }
                dataset.push(results)
                results = []
            }

        }
        if (apiType == 0 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < iterations; j++) {
                    let result = await measure.graphql(i + 1, req.body.id, overfetching)
                    results.push(result)
                }
                dataset.push(results)
                results = []
            }
        }
    } else {
        if (apiType == 1 || apiType == 2) {
            for (let i = 0; i < iterations; i++) {
                let result = await measure.rest(endpoint, req.body.id)
                results.push(result)
            }
            dataset.push(results)
            results = []
        }
        if (apiType == 0 || apiType == 2) {
            for (let i = 0; i < iterations; i++) {
                let result = await measure.graphql(endpoint, req.body.id, overfetching)
                results.push(result)
            }
            dataset.push(results)
            results = []
        }
    }

    console.log(dataset)
    res.render("index", {
        data: dataset
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

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/', (req, res) => {

})

module.exports = router