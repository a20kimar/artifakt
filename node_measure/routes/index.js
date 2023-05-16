const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

var data = []
var dataset = []
var datasetItems = []

router.get('/', (req, res) => {
    res.render("index", {
    });
})

router.get('/rest', (req, res) => {
    res.render("index", {
    });
})

router.post('/measure', async (req, res) => {
    let results = []
    let items = []
    /* Form data */
    endpoint = req.body.endpoint
    iterations = parseInt(req.body.iterations)
    apiType = req.body.apiType
    overfetching = req.body.overfetching ? true : false
    underfetching = req.body.underfetching ? true : false
    if (req.body.resetdata) {
        dataset = []
        datasetItems = []
    }
    /* Endpoint 6 = measure all endpoints */
    if (endpoint == 6) {
        console.log("Starting to measure all endpoints")
        /* Apitype 2 = measure both APIs */
        if (apiType == 1 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                console.log("Measuring rest.. endpoint " + (i + 1))
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
                console.log("Measuring graphql.. endpoint " + (i + 1))
                for (let j = 0; j < iterations; j++) {
                    let result = await measure.graphql(i + 1, req.body.id, overfetching)
                    results.push(result)
                }
                dataset.push(results)
                results = []
            }
        }
    } else if (endpoint != 7) {
        if (apiType == 1 || apiType == 2) {
            console.log("Measuring rest..")
            for (let i = 0; i < iterations; i++) {
                let result = await measure.rest(endpoint, req.body.id)
                results.push(result)
            }
            dataset.push(results)
            results = []
        }
        if (apiType == 0 || apiType == 2) {
            console.log("Measuring graphql..")
            for (let i = 0; i < iterations; i++) {
                let result = await measure.graphql(endpoint, req.body.id, overfetching)
                results.push(result)
            }
            dataset.push(results)
            results = []
        }
    }
    if (endpoint == 7) {
        let result = await measure.memTest(iterations)
        dataset.push(result)
        results = []
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