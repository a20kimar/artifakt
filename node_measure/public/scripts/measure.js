const fetch = require('axios')

const measureRest = async () => {
    /* Put Code to measure REST API */
    const objects = []
    const startTime = performance.now();
    await fetch("http://www.google.se/")
        .then(response => {
            const endTime = performance.now();
            const responseTime = endTime - startTime;

            console.log("Got response in " + responseTime + " milliseconds")
            objects.push({ time: responseTime, measure: "google" })
        })
        .catch(error => {
            console.error(error);
        })

    /* Return an array of objects containing property time+measure */
    return objects;
}

module.exports = {
    rest: measureRest
} 