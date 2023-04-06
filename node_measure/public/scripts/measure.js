const axios = require('axios')

const measureRest = async (id, iterations, fId) => {
    /* Id is the endpoint id, fId is the database entry id */
    let endpoint = "/rest/"
    if (id != null && id !== '' && typeof id !== 'undefined') {
        endpoint += id;
    }
    if (fId != null && fId !== '' && typeof fId !== 'undefined') {
        endpoint += "/" + fId;
    }
    console.log(endpoint)
    const objects = []
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        await axios("http://192.168.1.108:5000" + endpoint)
            .then(response => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                objects.push({ time: responseTime.toFixed(2) + " ms", endpoints: endpoint, items: response.data.length })
            })
            .catch(error => {
                console.error(error);
            })
    }

    /* Return an array of objects containing property time+measure */
    return objects;
}

module.exports = {
    rest: measureRest
} 