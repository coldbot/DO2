
    let printRows = false; // Flag to indicate whether to print rows
    fetch(googleSheetURL)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
    
            // Get the table rows (skip the header row)
            const rows = doc.querySelectorAll('table tbody tr');
            const tableBody = document.querySelector('#table-card-rating tbody');
    
            // Loop through the rows and extract and display the data
            rows.forEach(row => {
                const columns = row.querySelectorAll('td');
                
                // Check if there are at least 3 columns (skip the first two columns)
                if (columns.length < 3) {
                    return; // Skip this row
                }
    
                const rowData = Array.from(columns).map(column => column.textContent);
    
                if (rowData[3].startsWith('Deck Corrections')) {
                    printRows = false; // Stop printing rows
                }
    
                // Check if the third cell starts with "Group"
                if (rowData[3].startsWith('Cards Acquired')) {
                    printRows = true; // Start printing rows
                }
    
                if (printRows) {
                    // Create a new row in the HTML table
                    const newRow = document.createElement('tr');
                    
                    // Only add columns starting from the third column
                    for (let i = 0; i < rowData.length; i++) {
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

            // Functions go here
            removeFirst5Rows();
            removeColumnsAfter20();
            convertFirstRowToHeader();
            removeFirstColumn();
            renameHeaderInColumnOne();
            removeLast2Rows();
            addToColumnFour();
            calculateAndSortTable();
            removeColumnsAfterFour();
            //Leaf always for last
            insertImagesInTable2();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


        //Functions

        function removeFirst5Rows() {
            // Get a reference to the table
            var table = document.getElementById("table-card-rating");

            // Check if the table exists
            if (table) {
                // Get the table rows
                var rows = table.getElementsByTagName("tr");

                // Remove the first x rows
                for (var i = 0; i < 4 && i < rows.length; i++) {
                table.deleteRow(0);
                }

            }
        }

        function removeColumnsAfter20() {
            // Get a reference to the table
            var table = document.getElementById("table-card-rating");

            // Check if the table exists
            if (table) {
                // Loop through each row in the table
                for (var i = 0; i < table.rows.length; i++) {
                var row = table.rows[i];
                
                // Loop through each cell in the row starting from column 21 (index 20)
                for (var j = row.cells.length - 1; j >= 41; j--) {
                    row.deleteCell(j);
                }
                }
            }
        }


        function convertFirstRowToHeader() {
            // Get a reference to the table
            var table = document.getElementById("table-card-rating");

            // Check if the table exists
            if (table) {
                // Get the first row (index 0)
                var firstRow = table.rows[0];

                // Loop through the cells in the first row and replace <td> with <th>
                for (var i = 0; i < firstRow.cells.length; i++) {
                var cell = firstRow.cells[i];
                var newHeader = document.createElement("th");
                newHeader.innerHTML = cell.innerHTML;
                cell.parentNode.replaceChild(newHeader, cell);
                }
            }
            }

    function insertImagesInTable2() {
        const table = document.getElementById("table-card-rating");
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
    
    function renameHeaderInColumnOne() {
        // Get a reference to the table
        var table = document.getElementById("table-card-rating");

        // Check if the table exists
        if (table) {
            // Get the first row (index 0) which should be the header row
            var headerRow = table.rows[0];

            // Check if there are cells in the header row
            if (headerRow && headerRow.cells.length > 0) {
            // Update the content of the first cell (index 0) to "Hermit"
            headerRow.cells[0].textContent = "Hermit";
            headerRow.cells[1].textContent = "Deck Power";
            headerRow.cells[2].textContent = "Total Cards";
            headerRow.cells[3].textContent = "Total Value";

            }
        }
    }

function removeFirstColumn() {
  // Get a reference to the table
  var table = document.getElementById("table-card-rating");

  // Check if the table exists
  if (table) {
    // Loop through each row in the table
    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];

      // Check if there are cells in the row
      if (row.cells.length > 0) {
        // Remove the first cell (index 0) from the row
        row.deleteCell(0);
      }
    }
  }
}

function addToColumnFour() {
    // Get a reference to the table
    var table = document.getElementById("table-card-rating");
  
    // Check if the table exists
    if (table) {
      // Loop through each row in the table
      for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
  
        // Check if there are at least 4 cells in the row (fourth column)
        if (row.cells.length >= 4) {
          // Get the current value in the fourth column
          var currentValue = parseFloat(row.cells[3].textContent);
  
          // Check if the value is a valid number
          if (!isNaN(currentValue)) {
            // Add 14 to the current value and round it down to the nearest integer
            var newValue = Math.floor(currentValue + 14);
  
            // Update the fourth column with the new value
            row.cells[3].textContent = newValue.toString();
          }
        }
      }
    }
  }

function calculateAndSortTable() {
  // Get a reference to the table
  var table = document.getElementById("table-card-rating");
  // Check if the table exists
  if (table) {
    // Get the rows of the table
    var rows = Array.from(table.getElementsByTagName("tr"));
        // Loop through the rows starting from the second row (skip the header)
        for (var i = 1; i < rows.length; i++) {
      var row = rows[i].cells;

      // Check if there are at least four columns in the row
      if (row.length >= 4) {
        // Extract values from the third and fourth columns
        var thirdColumnValue = parseFloat(row[2].textContent);
        var fourthColumnValue = parseFloat(row[3].textContent);

        // Calculate the new value for the second column
        var calculatedValue = ((fourthColumnValue) / thirdColumnValue);

        // Update the second column with the calculated value
        row[1].textContent = calculatedValue.toFixed(2); // Round to two decimal places
        
      }
    }
    // Sort the table by the second column (index 1) in descending order
    rows.sort(function (a, b) {
      var aValue = parseFloat(a.cells[1].textContent);
      var bValue = parseFloat(b.cells[1].textContent);
      return bValue - aValue;
    });

    // Rebuild the table with the sorted rows
    for (var i = 0; i < rows.length; i++) {
      table.appendChild(rows[i]);
    }

  }
}

function removeLast2Rows() {
  // Get a reference to the table
  var table = document.getElementById("table-card-rating");

  // Check if the table exists
  if (table) {
    // Get the number of rows in the table
    var numRows = table.rows.length;

    // Check if there are at least 2 rows to remove
    if (numRows >= 2) {
      // Remove the last row
      table.deleteRow(numRows - 1);

      // Remove the second-to-last row
      table.deleteRow(numRows - 2);
    }
  }
}

function removeColumnsAfterFour() {
  // Get a reference to the table
  var table = document.getElementById("table-card-rating");

  // Check if the table exists
  if (table) {
    // Loop through each row in the table
    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];

      // Check if there are at least 5 cells in the row
      if (row.cells.length >= 5) {
        // Remove columns starting from the fifth column (index 4)
        for (var j = row.cells.length - 1; j >= 4; j--) {
          row.deleteCell(j);
        }
      }
    }
  }
}

