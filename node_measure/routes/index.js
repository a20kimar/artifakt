const express = require('express')
const router = express.Router()
const measure = require('../public/scripts/measure')

var data = []
var dataset = []

router.get('/', (req, res) => {
    res.render("index", {
    });
})

router.get('/rest', async (req, res) => {
    res.render("index", {
    });
})

router.post('/measure', async (req, res) => {
    /* Info is needed to display the table */
    let info = []
    /* Form data */
    endpoint = req.body.endpoint
    iterations = req.body.iterations
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
                    let results = await measure.rest(i + 1, 1, req.body.id, underfetching)
                    info.push(results[0])
                }
                dataset.push(info)
                info = []
            }

        }

        if (apiType == 0 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < iterations; j++) {
                    let results = await measure.graphql(i + 1, 1, req.body.id, overfetching)
                    info.push(results[0])
                }
                dataset.push(info)
                info = []
            }
        }

    } else {
        if (apiType == 1 || apiType == 2) {
            info = await measure.rest(endpoint, iterations, req.body.id, underfetching)
            dataset.push(info)
            info = []
        }
        if (apiType == 0 || apiType == 2) {
            info = await measure.graphql(endpoint, iterations, req.body.id, overfetching)
            dataset.push(info)
            info = []
        }
    }



    res.render("index", {
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