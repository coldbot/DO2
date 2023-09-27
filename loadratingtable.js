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
