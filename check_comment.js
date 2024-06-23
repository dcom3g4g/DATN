const btnFind = document.getElementById('btnFind');
const textInput = document.getElementById("text_input"); 
const containerAll = document.getElementById('container');
let tableStore = null;
btnFind.addEventListener('click', function() {
    let text = textInput.value; 
    console.log("check text",textInput); 
    fetch('http://103.15.90.112:5100/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text:text}) // Dữ liệu cần gửi
      })
        .then(response => response.json())
        .then(data => showResult(data))
        .catch(error => console.error('Error:', error));

});
function showResult(data){
    console.log(data);
    if (tableStore){
        containerAll.removeChild(tableStore);
    }
    let table = createTableRows(data);
    tableStore = table;
    containerAll.appendChild(table);
}
function createTableRows(personData) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    
    // Create table header row
    const headerCells = ['Bình luận đã chỉnh sửa', 'Đánh giá', 'Tỷ lệ chính xác'];
    headerCells.forEach(cellText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = cellText;
        headerRow.appendChild(headerCell);
    });
    // Create table body rows based on numberOfRows

        const dataRow = table.insertRow();

        dataRow.style.height = '50px'; // Set the desired row height

        // Add comment name
        const nameCell = document.createElement('td');
        nameCell.textContent = personData.text;
        nameCell.style.width = '200px'; // Set desired width for name cell
        dataRow.appendChild(nameCell);

        // Add review score
        const reviewScoreCell = document.createElement('td');
        reviewScoreCell.style.width = '100px'; // Set desired width for review score cell

        if (personData.sentiment === "Positive") {
            reviewScoreCell.textContent = "Tích cực";
            reviewScoreCell.style.color = 'green';
        } else {
            reviewScoreCell.textContent = "Tiêu cực";
            reviewScoreCell.style.color = 'red';
        }
        dataRow.appendChild(reviewScoreCell);

        // Add percent
        const percentCell = document.createElement('td');
        percentCell.textContent = personData.accuracy;
        percentCell.style.width = '50px'; // Set desired width for comment cell
        dataRow.appendChild(percentCell);
    return table;
}

