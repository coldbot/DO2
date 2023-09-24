const nameImageHash = {
    "BdoubleO100": "https://static.wikia.nocookie.net/hermitcraft/images/5/55/BdoubleO100-face.png",
    "Cubfan135": "https://static.wikia.nocookie.net/hermitcraft/images/7/7e/Cubfan135-face.png",
    "Docm77": "https://static.wikia.nocookie.net/hermitcraft/images/6/66/Docm77-face.png",
    "Ethoslab": "https://static.wikia.nocookie.net/hermitcraft/images/2/25/EthosLab-face.png",
    "Geminitay": "https://static.wikia.nocookie.net/hermitcraft/images/2/2d/GeminiTay-face.png",
    "GeminiTay": "https://static.wikia.nocookie.net/hermitcraft/images/2/2d/GeminiTay-face.png",
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
    "Rendog": "https://static.wikia.nocookie.net/hermitcraft/images/3/3e/Rendog-face.png",
    "Stress": "https://static.wikia.nocookie.net/hermitcraft/images/1/1f/StressMonster101-face.png",
    "VintageBeef": "https://static.wikia.nocookie.net/hermitcraft/images/f/fb/VintageBeef-face.png",
    "Xisuma": "https://static.wikia.nocookie.net/hermitcraft/images/6/67/Xisumavoid-face.png",
    "Zedaph": "https://static.wikia.nocookie.net/hermitcraft/images/c/c8/Zedaph-face.png",
    "ZombieCleo": "https://static.wikia.nocookie.net/hermitcraft/images/9/90/ZombieCleo-face.png",
    "FalseSymmetry": "https://static.wikia.nocookie.net/hermitcraft/images/c/c0/FalseSymmetry-face.png",
    "MumboJumbo": "https://static.wikia.nocookie.net/hermitcraft/images/1/15/MumboJumbo-face.png",
    "TangoTek": "https://static.wikia.nocookie.net/hermitcraft/images/7/71/TangoTek-face.png",
    "XB": "https://static.wikia.nocookie.net/hermitcraft/images/d/df/XBCrafted-face.png",
    "xBCrafted":"https://static.wikia.nocookie.net/hermitcraft/images/d/df/XBCrafted-face.png"
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



//// GET DATA FROM GOOGLE SHEETS

const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQrXRcKhaXrVDsUs9rcnfCSTC3K-9Q_D8Cidl4IP4rUcPeiSSNxU2fv7eHce4F_EXHZM7RJCTcSbS_b/pubhtml';
    
let printRows = false; // Flag to indicate whether to print rows
fetch(googleSheetURL)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Get the table rows (skip the header row)
        const rows = doc.querySelectorAll('table tbody tr');
        const tableBody = document.querySelector('#data-table-runs tbody');

        // Loop through the rows and extract and display the data
        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            
            // Check if there are at least 3 columns (skip the first two columns)
            if (columns.length < 3) {
                return; // Skip this row
            }

            const rowData = Array.from(columns).map(column => column.textContent);

            if (rowData[1].startsWith('Deaths')) {
                printRows = false; // Stop printing rows
            }

            // Check if the third cell starts with "Group"
            if (rowData[0].startsWith('Group')) {
                printRows = true; // Start printing rows
            }

            if (printRows) {
                // Create a new row in the HTML table
                const newRow = document.createElement('tr');
                
                // Only add columns starting from the third column
                for (let i = 2; i < rowData.length; i++) {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[i];
                    newRow.appendChild(cell);
                }

                tableBody.appendChild(newRow);
            }
        });

        removeUnwantedColumns();
        deleteFirstRow();
        removeRowsWithoutAlphabeticalCharacters();
        showLast10Rows();
        insertImagesInTable();
        reverseTableRows();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


        // Function to remove unwanted columns
function removeUnwantedColumns() {
    const table = document.getElementById("data-table-runs");
    if (table) {
        const rows = table.getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            // Define an array of column indices you want to remove
            const columnsToRemove = [2, 3, 4, 5, 6, 7,10,14,15,17,18,20, 22, 23,24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

            for (let j = columnsToRemove.length - 1; j >= 0; j--) {
                const columnIndex = columnsToRemove[j];
                if (columnIndex < cells.length) {
                    cells[columnIndex].remove();
                }
            }
        }
    }
}

        function removeRowsWithoutAlphabeticalCharacters() {
    const table = document.getElementById("data-table-runs");
    const rows = table.getElementsByTagName('tr');

    for (let i = rows.length - 1; i > 0; i--) { // Start from i = rows.length - 1 and skip the first row (i = 0)
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let hasAlphabeticalCharacter = false;

        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.trim();
            if (/[a-zA-Z]/.test(cellText)) {
                hasAlphabeticalCharacter = true;
                break;
            }
        }

        if (!hasAlphabeticalCharacter) {
            table.deleteRow(i);
        }
    }
}

    function deleteFirstRow() {
        // Get a reference to the table by its id
        var table = document.getElementById('data-table-runs');

        // Check if the table exists
        if (table) {
            // Check if the table has any rows
            if (table.rows.length > 0) {
            // Delete the first row
            table.deleteRow(1);
            table.deleteRow(2);
            } else {
            console.log('Table is empty, no rows to delete.');
            }
        } else {
            console.log('Table not found.');
        }
    }

    function showLast10Rows() {
        const table = document.getElementById("data-table-runs");
        const rows = table.getElementsByTagName('tr');
        const numRows = rows.length;

        // Hide all rows initially
        for (let i = 1; i < numRows; i++) { // Start from 1 to skip the header row
            rows[i].style.display = 'none';
        }

        // Show the last 10 rows (including the header row)
        for (let i = Math.max(0, numRows - 10); i < numRows; i++) {
            rows[i].style.display = '';
        }
     }

     function insertImagesInTable() {
        const table = document.getElementById("data-table-runs");
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let nameFound = false;

            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent.trim();
                if (nameImageHash.hasOwnProperty(cellText)) {
                    const name = cellText;
                    const imageSrc = nameImageHash[name];
                    const image = document.createElement("img");
                    image.src = imageSrc;
                    image.width = 20;
                    image.height = 20;

                    // Create a space element
                    const space = document.createTextNode(" ");

                    // Clear the content of the cell
                    cells[j].innerHTML = '';

                    // Append the image, space, and name to the cell
                    cells[j].appendChild(image);
                    cells[j].appendChild(space);
                    cells[j].appendChild(document.createTextNode(name));

                    nameFound = true; // Set the flag to break out of the loop
                    break;
                }
            }

            if (!nameFound) {
                // Handle the case where the name is not found in any cell
            }
        }
    }

    var reversed = false;
    function reverseTableRows() {
        var table = document.getElementById("data-table-runs");
        var tbody = table.getElementsByTagName("tbody")[0];
        var rows = tbody.getElementsByTagName("tr");
        
        var numRows = rows.length;
        var reversedRows = [];
        
        // Copy rows in reverse order if not already reversed, or restore original order
        if (!reversed) {
            for (var i = numRows - 1; i >= 0; i--) {
                reversedRows.push(rows[i]);
            }
        } else {
            for (var i = 0; i < numRows; i++) {
                reversedRows.push(rows[i]);
            }
        }
        
        // Remove existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        
        // Append reversed rows
        for (var i = 0; i < reversedRows.length; i++) {
            tbody.appendChild(reversedRows[i]);
        }

        // Toggle the reversed flag
        reversed = !reversed;
    }