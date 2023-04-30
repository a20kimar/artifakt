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
    /* Info is needed to display the table */
    let info = []
    /* Form data */
    endpoint = req.body.endpoint
    iterations = req.body.iterations
    apiType = req.body.apiType

    /* Endpoint 6 = measure all endpoints */
    if (endpoint == 6) {
        /* Reset the dataset for each measurement */
        /* This is done because most of the time you want the dataset to reset when doing a measurement on all endpoints */
        dataset = []
        /* Apitype 2 = measure both APIs */
        if (apiType == 1 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < iterations; j++) {
                    let results = await measure.rest(i + 1, 1, req.body.id)
                    info.push(results[0])
                }
                dataset.push(info)
                info = []
            }

        }

        if (apiType == 0 || apiType == 2) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < iterations; j++) {
                    let results = await measure.graphql(i + 1, 1, req.body.id)
                    info.push(results[0])
                }
                dataset.push(info)
                info = []
            }
        }

    } else {
        if (apiType == 1 || apiType == 2) {
            info = await measure.rest(endpoint, iterations, req.body.id)
            dataset.push(info)
            info = []
        }
        if (apiType == 0 || apiType == 2) {
            info = await measure.graphql(endpoint, iterations, req.body.id)
            dataset.push(info)
            info = []
        }
    }



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