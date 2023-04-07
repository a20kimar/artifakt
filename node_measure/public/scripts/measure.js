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


const measureGraphQL = async (id, iterations, fId) => {
    let query
    let field
    let secondField
    if (id == '1') {
        field = "employee"
        query = `getEmployee { ${field}(id:${fId}) { id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status } } `
    }
    if (id == '2') {
        field = "employees"
        query = `getEmployees { ${field} { id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status } } `
    }
    if (id == '3') {
        field = "companies"
        query = `getCompanies { ${field} { id name rate code } } `
    }
    if (id == '4') {
        field = "company"
        query = `getCompany { ${field}(id:${fId}) { id name rate code } } `
    }
    if (id == '5') {
        field = "company"
        secondField = "employees"
        query = `getEmployeesFromCompany { ${field}(id:${fId}) { ${secondField} { id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status  } } } `
    }
    console.log(query)

    const endpoint = "/graphql"
    const objects = []
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        await axios({
            url: "http://192.168.1.108:5000" + endpoint,
            method: 'post',
            data: {
                "query": `query ${query}`
            }
        }).then(response => {
            const endTime = performance.now();
            const responseTime = endTime - startTime;
            console.log(response.data.data[field])
            objects.push({ time: responseTime.toFixed(2) + " ms", endpoints: endpoint + "/" + id, items: response.data.data[field].length })
        })
            .catch(error => {
                console.error(error);
            })
    }

    /* Return an array of objects containing property time+measure */
    return objects;
}

module.exports = {
    rest: measureRest,
    graphql: measureGraphQL
} 