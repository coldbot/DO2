var myBarChart;
var randomColors = ["rgb(255, 215, 0)", 
"rgb(192, 192, 192)", 
"rgb(205, 127, 50)",
"#2f4f4f", // Red
"#556b2f", // Green
"#483d8b",
"#008000",
"#9acd32",
"#00008b",
"#ff4500",
"#ffa500",
"#ffff00",
"#7cfc00",
"#00ff7f",
"#dc143c",
"#00ffff",
"#00bfff",
"#0000ff",
"#ff00ff",
"#1e90ff",
"#db7093",
"#f0e68c",
"#ff1493",
"#ffa07a",
"#ee82ee",
"white",
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

document.getElementById("button4").addEventListener("click", function () {
    myCSV = "phase3_modified_data.csv";
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
                        {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: 462, // X-coordinate where you want to draw the line
                            borderColor: 'rgb(241,235,221)', // Color of the line
                            borderWidth: myborder, // Width of the line
                            label: {
                                content: 'Phase 3', // Label text
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



/// Sort tables


// Function to toggle the sorting order
function toggleSortOrder(currentOrder) {
    return currentOrder === 'asc' ? 'desc' : 'asc';
  }
  
  // Function to sort the table by a specific column
  function sortTableByColumn(table, columnIndex, sortOrder) {
    // Get the table body rows as an array
    var rows = Array.from(table.tBodies[0].rows);
  
    // Sort the rows based on the column's data
    rows.sort(function (a, b) {
      var valueA = a.cells[columnIndex].textContent.trim();
      var valueB = b.cells[columnIndex].textContent.trim();
  
      if (!isNaN(valueA) && !isNaN(valueB)) {
        // Compare as numbers if both values are numeric
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        // Compare as strings if one or both values are non-numeric
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
  
    // Update the table with the sorted rows
    rows.forEach(function (row) {
      table.tBodies[0].appendChild(row);
    });
  }
  
  // Function to initialize table sorting
  function initializeTableSorting() {
    var table = document.getElementById("table-card-rating");
  
    // Check if the table exists
    if (table) {
      // Attach click event listeners to the table header cells
      var headerCells = table.tHead.rows[0].cells;
      var sortOrder = {}; // To keep track of sorting order for each column
  
      for (var i = 0; i < headerCells.length; i++) {
        headerCells[i].addEventListener("click", function () {
          var columnIndex = this.cellIndex;
  
          // Toggle the sorting order
          sortOrder[columnIndex] = toggleSortOrder(sortOrder[columnIndex]);
  
          // Sort the table by the clicked column
          sortTableByColumn(table, columnIndex, sortOrder[columnIndex]);
  
          // Remove sorting indicators from other columns
          for (var j = 0; j < headerCells.length; j++) {
            if (j !== columnIndex) {
              headerCells[j].classList.remove("sorted-asc", "sorted-desc");
            }
          }
  
          // Add a sorting indicator to the clicked column header
          this.classList.toggle("sorted-asc", sortOrder[columnIndex] === 'asc');
          this.classList.toggle("sorted-desc", sortOrder[columnIndex] === 'desc');
        });
      }
    }
  }
  