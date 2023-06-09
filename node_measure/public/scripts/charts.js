
var previouslyFoundEndpoints = []

function init() {
    if (typeof raspberrypi != 'undefined' && typeof ubuntu != 'undefined') {
        raspberrypi = removeNoise(raspberrypi)
        ubuntu = removeNoise(ubuntu)
        console.log(raspberrypi)
        for (let i = 0; i < (raspberrypi.length / 2); i++) {
            let title = "Raspberry Pi "
            let data = [
                raspberrypi[i].map((obj) => parseFloat(obj.time.toFixed(2))),
                raspberrypi[(raspberrypi.length / 2) + i].map((obj) => parseFloat(obj.time.toFixed(2)))
            ]
            let labels = []
            labels.push(getName(raspberrypi[i][0].endpoints.split("/")[1]))
            labels.push(getName(raspberrypi[(raspberrypi.length / 2) + i][0].endpoints.split("/")[1]))
            let endpoint = getEndpoint(parseInt(raspberrypi[i][0].endpoints.slice(-1)))
            console.log(labels)
            createSingleBarChart({ title: title + endpoint, labels: labels, data: data })
            createSingleLineChart({ title: title + endpoint, labels: labels, data: data })
        }
        for (let i = 0; i < (ubuntu.length / 2); i++) {
            let title = "Ubuntu "
            let data = [
                ubuntu[i].map((obj) => parseFloat(obj.time.toFixed(2))),
                ubuntu[(ubuntu.length / 2) + i].map((obj) => parseFloat(obj.time.toFixed(2)))
            ]
            let labels = []
            labels.push(getName(ubuntu[i][0].endpoints.split("/")[1]))
            labels.push(getName(ubuntu[(ubuntu.length / 2) + i][0].endpoints.split("/")[1]))
            let endpoint = getEndpoint(parseInt(ubuntu[i][0].endpoints.slice(-1)))
            createSingleBarChart({ title: title + endpoint, labels: labels, data: data })
            createSingleLineChart({ title: title + endpoint, labels: labels, data: data })
        }
        for (let i = 0; i < (ubuntu.length / 2); i++) {
            let title = "Both "
            let data = [
                ubuntu[i].map((obj) => parseFloat(obj.time.toFixed(2))),
                ubuntu[(ubuntu.length / 2) + i].map((obj) => parseFloat(obj.time.toFixed(2))),
                raspberrypi[i].map((obj) => parseFloat(obj.time.toFixed(2))),
                raspberrypi[(raspberrypi.length / 2) + i].map((obj) => parseFloat(obj.time.toFixed(2)))
            ]
            let labels = []
            labels.push("Ubuntu " + getName(ubuntu[i][0].endpoints.split("/")[1]))
            labels.push("Ubuntu " + getName(ubuntu[(ubuntu.length / 2) + i][0].endpoints.split("/")[1]))
            labels.push("Raspberry Pi " + getName(raspberrypi[i][0].endpoints.split("/")[1]))
            labels.push("Raspberry Pi " + getName(raspberrypi[(raspberrypi.length / 2) + i][0].endpoints.split("/")[1]))
            let endpoint = getEndpoint(parseInt(ubuntu[i][0].endpoints.slice(-1)))
            createSingleBarChart({ title: title + endpoint, labels: labels, data: data })
            createSingleLineChart({ title: title + endpoint, labels: labels, data: data })
        }
    }
    if (typeof raspberrypiMemorytest != 'undefined' && typeof ubuntuMemorytest != 'undefined') {
        for (let i = 0; i < raspberrypiMemorytest.length; i++) {
            let title = "Raspberry Pi "
            let data = [
                raspberrypiMemorytest[i].map((obj) => parseFloat(obj.time.toFixed(2))),
                ubuntuMemorytest[i].map((obj) => parseFloat(obj.time.toFixed(2))),
            ]
            let labels = []
            labels.push("Raspberry Pi")
            labels.push("Ubuntu")
            let endpoint = getEndpoint(parseInt(raspberrypiMemorytest[i][0].endpoints.slice(-1)))
            createSingleBarChart({ title: title + endpoint, labels: labels, data: data })
            createSingleLineChart({ title: title + endpoint, labels: labels, data: data })
        }
    }
    console.log("----New data below----")
    //measurements = dummyData
    if (typeof measurements != 'undefined') {
        console.log(measurements)
        let endpoint = measurements[0][0].endpoints.slice(-1)
        if (endpoint == 7) {
            let labels = ["Time"]
            let data = [measurements[0].map((obj) => parseFloat(obj.time.toFixed(2)))]
            createSingleLineChart({ title: "Memory test time", labels: labels, data: data })
            labels = ["Size"]
            data = [measurements[0].map((obj) => parseFloat(obj.size).toFixed(2))]
            createSingleLineChart({ title: "Memory test size", labels: labels, data: data })
            labels = ["Size", "Time"]
            data = [
                measurements[0].map((obj) => (parseFloat(obj.size) / 10).toFixed(2)),
                measurements[0].map((obj) => parseFloat(obj.time.toFixed(2)))
            ]
            createSingleLineChart({ title: "Memory test both", labels: labels, data: data })
        } else {
            //measurements = removeNoise(measurements)
            createBarCharts()
            for (let i = 0; i < measurements.length / 2; i++) {
                createLineCharts(i, findMatchingEndpoints(measurements))
            }
        }
    }
    function removeNoise(measurements) {
        for (let i = 0; i < measurements.length; i++) {
            let avg = calculateAverage(measurements[i].map((obj) => parseFloat(obj.time.toFixed(2))))
            for (let j = 0; j < measurements[i].length; j++) {
                console.log("time", measurements[i][j].time, "avg", avg)
                if (measurements[i][j].time > avg + (avg * 0.30)) {
                    measurements[i][j].time = avg
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

    function getEndpoint(num) {

        switch (num) {
            case 1:
                return "All employees"
            case 2:
                return "All companies"
            case 3:
                return "All companies from employees"
            case 4:
                return "Underfetching"
            case 5:
                return "Underfetching high volume"
            case 6:
                return "All endpoints"
            case 7:
                return "Memory test"
        }
    }
    /* Chartobj = title, labels, data */
    function createSingleLineChart(chartObj) {
        const numArr = Array(chartObj.data[0].length).fill(0).map((_, i) => i);
        let title = chartObj.title
        let datasets = []
        for (let i = 0; i < chartObj.labels.length; i++) {
            datasets.push({
                label: chartObj.labels[i],
                data: chartObj.data[i]
            })
        }
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
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Time (milliseconds)",
                            font: {
                                size: 20
                            }
                        },
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        }
        const chartContainer = document.querySelector('.chart-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'new-chart ' + chartObj.title;
        chartContainer.appendChild(canvas);
        new Chart(canvas, chartConfig);
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
        console.log(datasets)
        let titles = ["All employees", "All companies", "All companies from employees", "Underfetching", "Underfetching high volume"]
        let title = titles[endpoint - 1]
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
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Time (milliseconds)",
                            font: {
                                size: 20
                            }
                        },
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        }
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

    function createSingleBarChart(chartObj) {
        const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']
        let title = chartObj.title
        let labels = chartObj.labels
        let datasets = []
        for (let i = 0; i < chartObj.data.length; i++) {
            let std = parseFloat(calculateStdDev(chartObj.data[i]).toFixed(2))
            let avg = parseFloat(calculateAverage(chartObj.data[i]).toFixed(2))
            data = {
                y: avg,
                yMin: avg - std,
                yMax: avg + std
            }
            datasets[i] = {
                label: labels[i],
                data: []
            }
            datasets[i].data.push(data)
        }
        const barChartConfig = {
            type: "barWithErrorBars",
            data: {
                labels: [title],
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
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Time (milliseconds)",
                            font: {
                                size: 20
                            }
                        },
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        }
                    }

                }
            }
        };

        const chartContainer = document.querySelector('.chart-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'new-bar-chart ' + title;
        chartContainer.appendChild(canvas);
        new Chart(canvas, barChartConfig);
    }
    function createBarCharts() {
        let labels = ["All employees", "All companies", "All companies from employees", "Underfetching", "Underfetching high volume"]
        const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']
        let datasets = []
        for (let i = 0; i < measurements.length; i++) {
            let endpoint = measurements[i][0].endpoints.split("/")[1]
            let size = measurements[i][0].size
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
                    label: getName(endpoint) + " (" + size + " kb)",
                    data: [],
                    backgroundColor: colors[n],
                    borderColor: colors[n],
                    borderWidth: 1
                }
            }
            datasets[n].data.push(data)
        }
        labels = labels.slice(0, datasets[0].data.length)
        const barChartConfig = {
            type: "barWithErrorBars",
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "",
                        font: {
                            size: 24
                        }
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Time (milliseconds)",
                            font: {
                                size: 20
                            }
                        },
                        ticks: {
                            font: {
                                size: 20
                            }
                        },
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 20
                            }
                        }
                    }

                }
            }
        };

        const chartContainer = document.querySelector('.chart-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'new-chart-BarChart';
        chartContainer.appendChild(canvas);
        new Chart(canvas, barChartConfig);
    }
    function calculateAverage(measurements) {
        // Calculate the average of the measurements array
        const sum = measurements.reduce((acc, curr) => {
            return parseFloat(acc + curr)
        }, 0);
        const average = sum / measurements.length;
        return average;
    }

    function calculateStdDev(measurements) {
        // Calculate the standard deviation of the measurements array
        const average = calculateAverage(measurements);
        const squaredDiffs = measurements.reduce((acc, curr) => {
            const diff = curr - average;
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
            const timeValue = array[i].time;
            timeValues.push(timeValue);
        }
        return timeValues;
    }

}