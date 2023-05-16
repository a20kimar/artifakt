const axios = require('axios')
const url = "http://192.168.1.167"

const measureRest = async (id, fId) => {
    /* Id is the endpoint id, fId is the database entry id 
    if (id == null || id == '' || typeof id == 'undefined') {
        console.error("id is null or wrong")
    }
    if (fId != null && fId !== '' && typeof fId !== 'undefined') {
        endpoint += "/" + fId;
    }*/
    const objects = []
    let overfetch = false
    let results = []
    let endpoint = id + "/" + fId
    let iterations = 1;
    if (id == 4 || id == 5) {
        overfetch = true
        const startTime = performance.now();
        await axios(url + ":6000/rest/" + endpoint)
            .then(response => {
                const endTime = performance.now();
                /* responseTime is in milliseconds */
                const responseTime = endTime - startTime;
                /* Size is in KiloByte */
                results = response.data
                const size = (Buffer.byteLength(JSON.stringify(response.data)) / 1024).toFixed(2)
                objects.push({ time: responseTime.toFixed(2), endpoints: endpoint, items: response.data.length, size: size })
            })
            .catch(error => {
                console.error(error);
            })
        iterations = results.length
        id = id - 1
    }
    for (let i = 0; i < iterations; i++) {
        endpoint = results.length > 0 && id == 3 ? 4 : id
        if (id > 2) {
            endpoint += results.length > 0 ? "/" + results[i].id : "/" + fId
        }
        const startTime = performance.now();
        await axios(url + ":6000/rest/" + endpoint)
            .then(response => {
                const endTime = performance.now();
                /* responseTime is in milliseconds */
                const responseTime = endTime - startTime;
                /* Size is in KiloByte */
                results.push(response.data)
                const size = (Buffer.byteLength(JSON.stringify(response.data)) / 1024).toFixed(2)
                objects.push({ time: responseTime.toFixed(2), endpoints: endpoint, items: response.data.length, size: size })
            })
            .catch(error => {
                console.error(error);
            })
    }
    id = overfetch ? id + 1 : id

    endpoint = "/rest/" + id
    const sum = { time: 0, endpoints: endpoint, items: 0, size: 0 }
    objects.forEach(obj => {
        sum.time += parseFloat(obj.time)
        sum.items += obj.items
        sum.size += parseFloat(obj.size)
    })
    /* Return an array of objects containing property time, endpoints & items */
    return sum
}


const measureGraphQL = async (id, fId, overfetching) => {
    let query
    let field
    let secondField
    /* All employees */
    if (id == '1') {
        field = "employees"
        query = `getEmployees { ${field} { id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status } } `
        if (overfetching) {
            query = `getEmployee { ${field} { id fName lName area position company rate status } } `
        }
    }
    /* All companies */
    if (id == '2') {
        field = "companies"
        query = `getCompanies { ${field} { id name rate code } } `
        if (overfetching) {
            query = `getCompanies { ${field} { id name } } `
        }
    }
    /* All companies from employees */
    if (id == '3') {
        field = "company"
        query = `getCompany { ${field}(id:${fId}) { id name rate code } } `
        if (overfetching) {
            query = `getCompany { ${field}(id:${fId}) { id name } } `
        }
    }
    /* Search companies and get their employees */
    if (id == '4') {
        field = "company"
        secondField = "employees"
        query = `getEmployeesFromCompany { ${field}(id:${fId}) { id name rate code ${secondField} { id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status  } } } `
        if (overfetching) {
            query = `getEmployeesFromCompany { ${field}(id:${fId}) { name code ${secondField} { id fName lName area position company rate status } } } `
        }
    }
    /* Search employees and get their company */
    if (id == '5') {
        field = "employee"
        secondField = "companyobj"
        query = `getCompanyFromEmployees { ${field}(id:${fId}) {  id fName lName area position birthday gender philhealth hiringdate pagibig tin ssid company rate status ${secondField} { id name rate code } } } `
        if (overfetching) {
            query = `getCompanyFromEmployees { ${field}(id:${fId}) { id fName lName area position company rate status ${secondField} { name code } } } `
        }
    }

    const endpoint = "/graphql"
    let object
    const startTime = performance.now();
    await axios({
        url: url + ":5000" + endpoint,
        method: 'post',
        data: {
            "query": `query ${query}`
        }
    }).then(response => {
        const endTime = performance.now();
        /* responseTime is in milliseconds */
        const responseTime = endTime - startTime;
        /* Size is in KiloByte */
        const size = (Buffer.byteLength(JSON.stringify(response.data.data)) / 1024).toFixed(2)
        let items;
        if (id == 4 || id == 5) {
            items = [response.data.data[field]].length
        } else {
            items = response.data.data[field].length
        }
        results = response.data.data[field]
        object = { time: parseFloat(responseTime.toFixed(2)), endpoints: endpoint + "/" + id, items: items, size: parseFloat(size) }
    })
        .catch(error => {
            console.error(error.message);
        })

    /* Return an array of objects containing property time, endpoints & items */
    return object
}

const memTest = async (iterations) => {
    resetMemory()
    let numOfReplies = 0
    let objects = []
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        await axios(url + ":6000/rest/7")
            .then(response => {
                const endTime = performance.now();
                /* responseTime is in milliseconds */
                const responseTime = endTime - startTime;
                numOfReplies++
                console.log(numOfReplies)
                if (typeof response.data.size != 'undefined') {
                    objects.push({ time: responseTime, endpoints: "/rest/7", items: response.data.items, size: response.data.size })
                }
            })
            .catch(error => {
                console.error(error.message);
                return objects
            })
    }
    return objects
}

const resetMemory = async () => {
    await axios(url + ":6000/rest/8")
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error(error.message);
        })
}

module.exports = {
    rest: measureRest,
    graphql: measureGraphQL,
    memTest: memTest
} 