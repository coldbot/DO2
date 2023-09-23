const nameImageHash = {
    "BdoubleO100": "https://static.wikia.nocookie.net/hermitcraft/images/5/55/BdoubleO100-face.png",
    "Cubfan135": "https://static.wikia.nocookie.net/hermitcraft/images/7/7e/Cubfan135-face.png",
    "Docm77": "https://static.wikia.nocookie.net/hermitcraft/images/6/66/Docm77-face.png",
    "Ethoslab": "https://static.wikia.nocookie.net/hermitcraft/images/2/25/EthosLab-face.png",
    "Geminitay": "https://static.wikia.nocookie.net/hermitcraft/images/2/2d/GeminiTay-face.png",
    "Scar": "https://static.wikia.nocookie.net/hermitcraft/images/7/7f/GoodTimesWithScar-face.png",
    "Grian": "https://static.wikia.nocookie.net/hermitcraft/images/b/bb/Grian-face.png",
    "Hypnotizd": "https://static.wikia.nocookie.net/hermitcraft/images/d/d5/Hypnotizd-face.png",
    "iJevin": "https://static.wikia.nocookie.net/hermitcraft/images/b/bc/IJevin-face.png",
    "impulseSV": "https://static.wikia.nocookie.net/hermitcraft/images/e/e6/ImpulseSV-face.png",
    "iskall85": "https://static.wikia.nocookie.net/hermitcraft/images/d/db/Iskall85-face.png",
    "JoeHills": "https://static.wikia.nocookie.net/hermitcraft/images/4/4d/JoeHills-face.png",
    "Keralis": "https://static.wikia.nocookie.net/hermitcraft/images/8/80/Keralis-face.png",
    "Pearl": "https://static.wikia.nocookie.net/hermitcraft/images/f/f2/PearlescentMoon-face.png",
    "RenDog": "https://static.wikia.nocookie.net/hermitcraft/images/3/3e/Rendog-face.png",
    "Stress": "https://static.wikia.nocookie.net/hermitcraft/images/1/1f/StressMonster101-face.png",
    "VintageBeef": "https://static.wikia.nocookie.net/hermitcraft/images/f/fb/VintageBeef-face.png",
    "Xisuma": "https://static.wikia.nocookie.net/hermitcraft/images/6/67/Xisumavoid-face.png",
    "Zedaph": "https://static.wikia.nocookie.net/hermitcraft/images/c/c8/Zedaph-face.png",
    "ZombieCleo": "https://static.wikia.nocookie.net/hermitcraft/images/9/90/ZombieCleo-face.png",
    "FalseSymmetry": "https://static.wikia.nocookie.net/hermitcraft/images/c/c0/FalseSymmetry-face.png",
    "MumboJumbo": "https://static.wikia.nocookie.net/hermitcraft/images/1/15/MumboJumbo-face.png",
    "TangoTek": "https://static.wikia.nocookie.net/hermitcraft/images/7/71/TangoTek-face.png",
    "XB": "https://static.wikia.nocookie.net/hermitcraft/images/d/df/XBCrafted-face.png"
};


function loadCSVForTable1() {
    fetch('standings_table_data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const tableBody = document.querySelector('#ratingTable tbody');

            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(',');
                const row = document.createElement('tr');

                for (let j = 0; j < columns.length; j++) {
                    const cell = document.createElement('td');

                    if (j === 1) {
                        const numericValue = parseFloat(columns[j]);
                        
                        if (numericValue > 0) {
                            cell.style.color = 'rgb(102, 255, 51)';
                            cell.style.fontWeight = "900";
                            cell.textContent = '↑' + numericValue.toFixed(0);
                        } else if (numericValue < 0) {
                            cell.style.color = 'red';
                            cell.style.fontWeight = "900";
                            cell.textContent = '↓' + numericValue*(-1);
                        } else if (numericValue == 0) {
                            cell.textContent = "";
                        }


                    } else if (j === 2) {
                        const name = columns[j];
                        if (nameImageHash.hasOwnProperty(name)) {
                            const img = document.createElement('img');
                            img.src = nameImageHash[name];
                            img.alt = name; 
                            img.style.width = '20px'; 
                            img.style.height = '20px'; 
                            cell.appendChild(img);
                            cell.appendChild(document.createTextNode(" "));
                        }
                        cell.appendChild(document.createTextNode(name));
                    } else {
                        cell.textContent = columns[j];
                    }

                    row.appendChild(cell);
                }

                tableBody.appendChild(row);
            }
        });
}

window.addEventListener('load', loadCSVForTable1);


var myBarChart;
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
"#870000", // Mint
"#FF33A1", // Raspberry
"#33A1FF", // Sky Blue
"#fff", // Tangerine
"#A133FF", // Orchid
"#33FF57", // Lime
"#b35900", // Goldenrod
"#d6d6c2",
];

var myChart = null; 
var myCSV = "modified_data.csv";

// Function to change the CSV file when Button is clicked
document.getElementById("button1").addEventListener("click", function () {
    myCSV = "modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes
});

document.getElementById("button2").addEventListener("click", function () {
    myCSV = "phase1_modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes
});

document.getElementById("button3").addEventListener("click", function () {
    myCSV = "phase2_modified_data.csv";
    updateChart(myCSV); // Update the chart when the CSV changes

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
                        color: 'rgb(241,235,221)',
                    },
                    ticks: {
                        color: 'rgb(241,235,221)',
                    },
                    grid: {
                        color: 'rgba(211, 211, 211, 0)' // Light gray grid lines
                    },
                },
                y: {
                    title: {
                        display: true,
                        color: 'rgb(241,235,221)',
                        text: 'Decked Out 2 Rating', // Y-axis title
                    },
                    ticks: {
                        color: 'rgb(241,235,221)',
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
                            borderColor: 'rgb(241,235,221)', // Color of the line
                            borderWidth: myborder, // Width of the line
                            label: {
                                content: 'Phase 2', // Label text
                                enabled: true, // Set to false to hide the label
                                backgroundColor: 'rgb(241,235,221)',
                                color: 'black',
                                yAdjust: 0, // Adjust the label's vertical position
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        color: 'rgb(241,235,221)', // Set legend text color to rgb(241,235,221)
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
                            color: 'rgb(241,235,221)',
                        },
                        title: {
                            display: true,
                            text: 'Decked Out 2 Rating',
                            color: 'rgb(241,235,221)',
                        },
                        grid: {
                            color: 'rgba(211, 211, 211, 0.3)' // Light gray grid lines
                        }
                    },
                    x: {
                        ticks: {
                            color: 'rgb(241,235,221)',
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