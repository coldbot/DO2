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
                //const newCell = document.createElement('td');

                //newCell.textContent = '0';
                //newRow.appendChild(newCell);

                tableBody.appendChild(newRow);
            }
            



        });

        removeUnwantedColumns();
        deleteFirstRow();
        removeRowsWithoutAlphabeticalCharacters();
        //showLast10Rows();
        insertImagesInTable();
        reverseTableRows();
        //colorColumn34Yellow();
        //updateRatingChange();
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
            const columnsToRemove = [2, 3, 4, 5, 6, 7,10,14,15,17,18,20, 22, 23,24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

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

function colorColumn34Yellow() {
var table = document.getElementById("data-table-runs");
var rows = table.getElementsByTagName("tr");

for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
    var cells = rows[i].getElementsByTagName("td");
    cells[10].style.backgroundColor = "var(--highlight)"; 
    cells[10].style.color = "black";
    cells[10].style.fontWeight = "700";
    
}
}

function updateRatingChange() {
// Get the table element by its id
var table = document.getElementById("data-table-runs");

// Loop through all rows in the table (skip the header row)
for (var i = 1; i < table.rows.length; i++) {
    // Get the cell in the third column (index 2) for the current row
    var difficultyCell = table.rows[i].cells[2];

    // Get the cell in the eleventh column (index 10) for the current row
    var ratingChangeCell = table.rows[i].cells[10];

    // Check if the text in the third column contains "MEDIUM"
    if (difficultyCell && difficultyCell.textContent.trim() === "MEDIUM") {
    // Parse the current rating change value and add 10 to it
    var currentRatingChange = parseInt(ratingChangeCell.textContent, 10);
    var newRatingChange = currentRatingChange + 10;

    // Update the content of the eleventh column with the new value
    ratingChangeCell.textContent = newRatingChange;
}
}
}