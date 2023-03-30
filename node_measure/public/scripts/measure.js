const axios = require('axios')

const measureRest = async (id, iterations) => {
    /* Put Code to measure REST API */
    let endpoint = "/employees/"
    if (id != null && id !== '') {
        endpoint += id;
    }
    const objects = []
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        await axios("http://192.168.1.108:5000" + endpoint)
            .then(response => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                objects.push({ time: responseTime.toFixed(2) + " ms", measure: endpoint, content: response.data.length })
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