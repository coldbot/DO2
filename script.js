// Add this code to your JavaScript file

var myChart; // Declare myChart variable outside the complete function scope
var myBarChart
// Load the CSV file and create the chart

var randomColors = generateRandomColors(60); // Generate random colors for the line chart datasets

Papa.parse('modified_data.csv', {
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
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Decked Out 2 Rating', // Y-axis title
                    },
                },
            },
            plugins: {
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x',
                            value: 242, // X-coordinate where you want to draw the line
                            borderColor: 'black', // Color of the line
                            borderWidth: 2, // Width of the line
                            label: {
                                content: 'Phase 2', // Label text
                                enabled: true, // Set to false to hide the label
                                yAdjust: 0, // Adjust the label's vertical position
                            },
                        },
                    ],
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
    header: false, // Set to false since the first row is not a header
    dynamicTyping: true,
    complete: function (results) {
        var data = results.data;

        // Assuming the first row contains labels, and the second row contains data values
        var labels = data[0]; // Labels from the first row
        var dataset = data[1]; // Data values from the second row

        // Create an array of objects to store labels and data values together
        var dataWithLabels = [];
        for (var i = 0; i < labels.length; i++) {
            dataWithLabels.push({
                label: labels[i],
                value: dataset[i]
            });
        }

        // Sort the dataWithLabels array by data values in descending order
        dataWithLabels.sort(function(a, b) {
            return b.value - a.value;
        });

        // Extract sorted labels and data values from the sorted array
        var sortedLabels = dataWithLabels.map(function(item) {
            return item.label;
        });
        var sortedDataset = dataWithLabels.map(function(item) {
            return item.value;
        });

        // Calculate the suggestedMin for the y-axis
        var suggestedMin = Math.min(...sortedDataset) - 50;

        // Generate random colors for each bar in the dataset
        var backgroundColor = randomColors; // Use the same random colors for bars

        var barChartData = {
            labels: sortedLabels, // Use the sorted labels
            datasets: [{
                label: 'Current Rating', // Replace with your desired label
                backgroundColor: backgroundColor,
                borderColor: 'rgb(0, 0, 0, 0)',
                borderWidth: 1,
                data: sortedDataset, // Use the sorted data values
            }]
        };

        var ctx2 = document.getElementById('barChart').getContext('2d');
        var myBarChart = new Chart(ctx2, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                aspectRatio: 5 / 1, // Set the aspect ratio to 16:9
                scales: {
                    y: {
                        beginAtZero: false, // Set this to false to start from a custom minimum
                        suggestedMin: suggestedMin, // Set the suggestedMin to the calculated value
                    },
                },
                plugins: {
                    legend: {
                        display: false, // Hide the legend
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

