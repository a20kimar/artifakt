var previouslyFoundEndpoints = []

function init() {
    measurements = dummyData
    measurements = removeNoise(measurements)
    createBarCharts()
    for (let i = 0; i < measurements.length / 2; i++) {
        createLineCharts(i, findMatchingEndpoints(measurements))
    }
}
function removeNoise(measurements) {

    for (let i = 0; i < measurements.length; i++) {
        let avg = calculateAverage(measurements[i])
        for (let j = 0; j < measurements[i].length; j++) {
            if (parseFloat(measurements[i][j].time.split(" ")[0]) > avg + 10) {
                measurements[i][j].time = avg + " ms"
            }
        }
    }
    return measurements
}

function findMatchingEndpoints(measurements) {
    var matchingArrays = []
    for (let i = 0; i < measurements.length; i++) {
        let endpoint = parseInt(measurements[i][0].endpoints.split("/")[2])
        let api = measurements[i][0].endpoints.split("/")[1]
        if (!previouslyFoundEndpoints.includes(endpoint)) {
            previouslyFoundEndpoints.push(endpoint)
            for (let j = 0; j < measurements.length; j++) {
                let secondEndpoint = parseInt(measurements[j][0].endpoints.split("/")[2])
                let secondApi = measurements[j][0].endpoints.split("/")[1]
                if (endpoint == secondEndpoint) {
                    if (api != secondApi) {
                        matchingArrays.push(measurements[j])
                        matchingArrays.push(measurements[i])
                        return matchingArrays;
                    }
                }
            }
        }
    }
}

function getName(name) {
    if (name == "graphql") {
        return "GraphQL"
    } else {
        return "REST"
    }
}
function createLineCharts(lineChartID, measurements) {

    var times = extractAllTimeValues(measurements)
    const numArr = Array(measurements[0].length).fill(0).map((_, i) => i);
    let datasets = []
    let endpoint
    for (let i = 0; i < measurements.length; i++) {
        let name = getName(measurements[i][0].endpoints.split("/")[1])
        endpoint = measurements[i][0].endpoints.split("/")[2]
        datasets.push({
            label: name,
            data: times[i]
        })
    }
    let titles = ["Employees by ID", "All employees", "All companies", "Companies by ID", "Employees in company by ID"]
    let title = titles[endpoint]
    const chartConfig = {

        type: 'line',
        data: {
            labels: numArr,
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Time (milliseconds)"
                    },
                    beginAtZero: true
                }
            }
        }
    }
    const chartContainer = document.querySelector('.chart-container');
    const canvas = document.createElement('canvas');
    canvas.id = 'new-chart' + lineChartID;
    chartContainer.appendChild(canvas);
    new Chart(canvas, chartConfig);
}
function createBarCharts() {
    let labels = ["Employees by ID", "All employees", "All companies", "Companies by ID", "Employees in company by ID"]
    const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']
    let datasets = []
    for (let i = 0; i < measurements.length; i++) {
        let endpoint = measurements[i][0].endpoints.split("/")[1]
        let n = 0
        if (endpoint == "graphql") {
            n = 1
        }
        let std = parseFloat(calculateStdDev(measurements[i]).toFixed(2))
        let avg = parseFloat(calculateAverage(measurements[i]).toFixed(2))
        let data = {
            y: avg,
            yMin: avg - std,
            yMax: avg + std
        }
        if (!datasets[n]) {
            datasets[n] = {
                label: getName(endpoint),
                data: [],
                backgroundColor: colors[n],
                borderColor: colors[n],
                borderWidth: 1
            }
        }
        datasets[n].data.push(data)
    }
    labels = labels.slice(0, datasets[0].data.length)
    const chartConfig = {
        type: "barWithErrorBars",
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Time (milliseconds)"
                    },
                    beginAtZero: true
                }
            }
        }
    };

    const canvas = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(canvas, chartConfig);

}
function calculateAverage(measurements) {
    // Calculate the average of the measurements array
    const sum = measurements.reduce((acc, curr) => {
        const timeValue = parseFloat(curr.time.replace(" ms", ""));
        return acc + timeValue;
    }, 0);
    const average = sum / measurements.length;
    return average;
}

function calculateStdDev(measurements) {
    // Calculate the standard deviation of the measurements array
    const average = calculateAverage(measurements);
    const squaredDiffs = measurements.reduce((acc, curr) => {
        const timeValue = parseFloat(curr.time.replace(" ms", ""));
        const diff = timeValue - average;
        return acc + diff ** 2;
    }, 0);
    const variance = squaredDiffs / measurements.length;
    const stdDev = Math.sqrt(variance);
    return stdDev;
}

function extractAllTimeValues(arrayOfArrays) {
    const allTimeValues = [[], []];
    for (let i = 0; i < arrayOfArrays.length; i++) {
        const array = arrayOfArrays[i];
        const timeValues = extractTimeValues(array);
        allTimeValues[i] = timeValues;
    }
    return allTimeValues;
}

function extractTimeValues(array) {
    const timeValues = [];
    for (let i = 0; i < array.length; i++) {
        const timeString = array[i].time;
        const timeValue = parseFloat(timeString.split(' ')[0]);
        timeValues.push(timeValue);
    }
    return timeValues;
}
