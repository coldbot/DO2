// Add this code to your JavaScript file

var myChart; // Declare myChart variable outside the complete function scope

// Load the CSV file and create the chart
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
                    borderColor: getRandomColor(),
                    data: data.map(function (row) {
                        return row[columnName];
                    }),
                    fill: false,
                    spanGaps: true, // Add this line to span gaps in the line
                });
            }
        }

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                point: {
                    radius: 5,
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
                        text: 'EOL Rating', // Y-axis title
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
                                content: '2', // Label text
                                enabled: true, // Set to false to hide the label
                                yAdjust: -10, // Adjust the label's vertical position
                            },
                        },
                    ],
                },
            },
        };

        var ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: options,
        });

        // Function to generate random colors
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
});

// Add event listener for the "toggle" button
document.getElementById('toggle').addEventListener('click', function () {
    // Toggle the visibility of all datasets
    myChart.data.datasets.forEach(function (dataset) {
        dataset.hidden = !dataset.hidden; // Toggle the visibility
    });
    myChart.update(); // Update the chart to reflect the changes
});

