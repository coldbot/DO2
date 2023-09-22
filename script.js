
// Add this code to your JavaScript file
var myBarChart;
// Load the CSV file and create the chart

// var randomColors = generateRandomColors(60); // Generate random colors for the line chart datasets

var randomColors = ["rgb(255, 215, 0)", 
"rgb(192, 192, 192)", 
"rgb(205, 127, 50)",
"#99ccff", // Red
"#ff99ff", // Green
"#5733FF", // Blue
"#FF33A1", // Pink
"#33A1FF", // Light Blue
"#FFA133", // Orange
"#A133FF", // Purple
"#33FFA1", // Teal
"#66ff33", // Yellow
"#D633FF", // Lavender
"#FF3357", // Coral
"#33FFD6", // Aqua
"#FF5733", // Tomato
"#33FFA1", // Mint
"#FF33A1", // Raspberry
"#33A1FF", // Sky Blue
"#FFA133", // Tangerine
"#A133FF", // Orchid
"#33FF57", // Lime
"#b35900", // Goldenrod
"#d6d6c2",
];

var myChart = null; // Declare myChart variable outside the complete function scope
var myCSV = "modified_data.csv"; // Initial CSV file


// Function to change the CSV file when Button is clicked
document.getElementById("button1").addEventListener("click", function () {
    myCSV = "modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes
    document.getElementById("button1").style.backgroundColor = "rgb(159,197,232)";
    document.getElementById("button2").style.backgroundColor = "rgb(48,68,150)"; 
    document.getElementById("button3").style.backgroundColor = "rgb(48,68,150)"; 
});

document.getElementById("button2").addEventListener("click", function () {
    myCSV = "phase1_modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes
    document.getElementById("button1").style.backgroundColor = "rgb(48,68,150)";
    document.getElementById("button2").style.backgroundColor = "rgb(159,197,232)"; 
    document.getElementById("button3").style.backgroundColor = "rgb(48,68,150)"; 
});

document.getElementById("button3").addEventListener("click", function () {
    myCSV = "phase2_modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes
    document.getElementById("button1").style.backgroundColor = "rgb(48,68,150)";
    document.getElementById("button2").style.backgroundColor = "rgb(48,68,150)"; 
    document.getElementById("button3").style.backgroundColor = "rgb(159,197,232)"; 
});

function updateChart(newCSV) {
    Papa.parse(newCSV, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            var data = results.data;

            // Extract X and Y data from the CSV columns
            var labels = data.map(function (row) {
                return row['Run No.'];
            });

            var datasets = [];

            // Loop through Y columns and create datasets
            for (var columnName in data[0]) {
                if (columnName !== 'Run No.') {
                    datasets.push({
                        label: columnName,
                        borderColor: randomColors[datasets.length], // Use the same random color for lines
                        data: data.map(function (row) {
                            return row[columnName];
                        }),
                        fill: false,
                        spanGaps: true,
                    });
                }
            }

            var myLine = (newCSV === "modified_data.csv") ? 242 : 1000; // Adjust the line based on the CSV file

            // Update the chart with new data and annotations
            myChart.data.labels = labels;
            myChart.data.datasets = datasets;
            myChart.options.plugins.annotation.annotations[0].value = myLine;
            myChart.update();
        },
    });
}

Papa.parse(myCSV, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        var data = results.data;

        // Extract X and Y data from the CSV columns
        var labels = data.map(function (row) {
            return row['Run No.'];
        });

        var datasets = [];

        // Loop through Y columns and create datasets
        for (var columnName in data[0]) {
            if (columnName !== 'Run No.') {
                datasets.push({
                    label: columnName,
                    borderColor: randomColors[datasets.length], // Use the same random color for lines
                    data: data.map(function (row) {
                        return row[columnName];
                    }),
                    fill: false,
                    spanGaps: true,
                });
            }
        }

        if (myCSV == "modified_data.csv"){
            var myborder = 2;
        } else {
            var myborder = 0;
        }

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                point: {
                    radius: 6,
                    pointStyle: 'none',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Total Decked Out 2 Runs', // X-axis title
                        color: 'white',
                    },
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: 'rgba(211, 211, 211, 0)' // Light gray grid lines
                    },
                },
                y: {
                    title: {
                        display: true,
                        color: 'white',
                        text: 'Decked Out 2 Rating', // Y-axis title
                    },
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: 'rgba(211, 211, 211, 0.1)' // Light gray grid lines
                    }
                },
            },
            plugins: {
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: 241, // X-coordinate where you want to draw the line
                            borderColor: 'white', // Color of the line
                            borderWidth: myborder, // Width of the line
                            label: {
                                content: 'Phase 2', // Label text
                                enabled: true, // Set to false to hide the label
                                backgroundColor: 'white',
                                color: 'black',
                                yAdjust: 0, // Adjust the label's vertical position
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        color: 'white', // Set legend text color to white
                    },
                },
            },
        };

    
        var ctx1 = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: options,
        });
    },
});


Papa.parse('standings_data.csv', {
    download: true,
    header: false,
    dynamicTyping: true,
    complete: function (results) {
        var data = results.data;
        var labels = data[0];
        var dataset = data[1];
        var dataWithLabels = [];
        for (var i = 0; i < labels.length; i++) {
            dataWithLabels.push({
                label: labels[i],
                value: dataset[i]
            });
        }
        dataWithLabels.sort(function(a, b) {
            return b.value - a.value;
        });

        var suggestedMin = Math.min(...dataset) - 50;
        var backgroundColor = randomColors;

        var barChartData = {
            labels: labels,
            datasets: [{
                label: 'Current Rating',
                backgroundColor: backgroundColor,
                borderColor: 'rgb(0, 0, 0, 0)',
                borderWidth: 1,
                data: dataset,
            }]
        };

        var ctx2 = document.getElementById('barChart').getContext('2d');
        var myBarChart = new Chart(ctx2, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                aspectRatio: 5 / 1.4,
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMin: suggestedMin,
                        ticks: {
                            color: 'white',
                        },
                        title: {
                            display: true,
                            text: 'Decked Out 2 Rating',
                            color: 'white',
                        },
                        grid: {
                            color: 'rgba(211, 211, 211, 0.3)' // Light gray grid lines
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white',
                        },
                        grid: {
                            color: 'rgba(211, 211, 211, 0.3)' // Light gray grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'My Bar Chart',
                        color: 'white',
                    },
                },
                
            },
        });
    }
});




// Function to generate random colors
function generateRandomColors(count) {
    var randomColors = [];
    for (var i = 0; i < count; i++) {
        var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        randomColors.push(color);
    }
    return randomColors;
}

// Add event listener for the "toggle" button
document.getElementById('toggle').addEventListener('click', function () {
    // Toggle the visibility of all datasets
    myChart.data.datasets.forEach(function (dataset) {
        dataset.hidden = !dataset.hidden; // Toggle the visibility
    });
    myChart.update(); // Update the chart to reflect the changes
});