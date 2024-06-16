
const btnFind = document.getElementById('btnFind');
const containerAll = document.getElementById('container');
let previousSelection = null; 
let productDisplay;
const addPeopleButton = document.getElementById('addPeopleButton');
let tableContainer; 
const sampleData = [  // Replace with your actual data
    { name: 'Nguyễn Đình Hởi', comment: 'Ok', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Minh', comment: 'sản phẩm ok', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Trường An', comment: 'Em mới mua hồi 26/04 giờ mún bán lại thì còn được bao nhiu ạ', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Anh Nguyễn Thanh Đạm', comment: 'Sản phẩm chất lượng đạt rất tốt. Mua voi phiêu Giãm giá càng tuyệt vời', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Hưởng', comment: 'okee', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Anh Hải', comment: 'máy dùng ok', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Triệu Ngọc Hiếu', comment: 'Nv chi nhánh Chợ Gạo TG c Phương Thanh dthuong lắm ah trộm vía đừng hư hao gì hết nha', starRating: 5.0, reviewScore: 'Tích Cực' },
    { name: 'Anh Khanh', comment: 'Máy nóng rất tệ ,call cideo như muốn nổ,đang nt zalo cái tắt nguồn,nhanh hết pin nữa đem ra thì bảo gửi về hãng ktra bấm không thâyd nóng hay gì còn ktra bán hàng kiểu này chắc không có lại lần t2', starRating: 1.0, reviewScore: 'Tiêu Cực' },
    { name: 'Nhung', comment: 'Mới mua 3 ngày. Chụp hình thôi mà máy nóng dã man. Sạc 80 % dừng lại ko sạc nữa. Pin tụt nhanh quá', starRating: 3.0, reviewScore: 'Tiêu Cực' },
    { name: 'Võ Thị Diệu My', comment: 'Lúc mua thì bảo lỗi 1 doi 1 tới lúc may lỗi thì đi tham định 10 ngày chưa xong. Mua thì nhanh còn đoi thì rất lâu cũng k biết có đổi dc k 15pro max xài chua dc 30 ngày máy thì nóng muốn nổ tung.', starRating: 1.0, reviewScore: 'Tiêu Cực' },
    { name: 'Ngọ', comment: 'Dùng OK dút túi quàn hay bị nóng máy bực mình chốc lại nóng máy bực mình', starRating: 1.0, reviewScore: 'Tiêu Cực' },
   
    // ... Add more sample data objects for other people
];
const sampleProducts = [  // Replace with your actual product data
    { image: 'test.jpeg', title: 'Điện thoại iPhone 15 Pro Max', TotalComment: '10', price: '27.999.000 VNĐ', star: 3 },
];

// listener of click find
btnFind.addEventListener('click', function() {
    clearAllBody();
    containerAll.innerHTML = '';
    const productData = sampleProducts[0]; 
    productDisplay = createProductDisplay(productData);
    containerAll.appendChild(productDisplay);
    addSelectedBox();
    // create table container 
    createContainerWithHeader("Tất cả đánh giá")
    // add product display
    // add table 
    const newTable = createTableRows(10,true); // Add 5 rows each time
    tableContainer.appendChild(newTable);

});

function createContainerWithHeader(header){
    // add container 
    tableContainer = document.createElement('div');
    tableContainer.id = 'tableContainer';
    containerAll.appendChild(tableContainer);
    // add header 
    const headingText = header; // Store the heading text in a variable
    const headingElement = document.createElement('h1'); // Create an h1 element using JavaScript
    headingElement.textContent = headingText; // Set the text content of the h1 element
    tableContainer.appendChild(headingElement); // Append the h1 element to the body
    
}
// create table 
function createTableRows(numberOfRows,isCreateTitle =false, filter =null) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    
    // Create table header row
    const headerCells = ['Người bình luận', 'Bình luận', 'Điểm đánh giá trên web', 'Đánh giá'];
    if (isCreateTitle){
        headerCells.forEach(cellText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = cellText;
            headerRow.appendChild(headerCell);
        });
    }
    
    // Create table body rows based on numberOfRows
    for (let i = 0; i < numberOfRows; i++) {
        const personData = sampleData[i % sampleData.length];
        if (filter){
            console.log("check",personData.reviewScore,filter)
            if (personData.reviewScore != filter){
                continue; 
            }
        }
        const dataRow = table.insertRow();

        dataRow.style.height = '50px'; // Set the desired row height

        // Add comment name
        const nameCell = document.createElement('td');
        nameCell.textContent = personData.name;
        nameCell.style.width = '200px'; // Set desired width for name cell
        dataRow.appendChild(nameCell);

        // Add comment
        const commentCell = document.createElement('td');
        commentCell.textContent = personData.comment;
        commentCell.style.width = '400px'; // Set desired width for comment cell
        dataRow.appendChild(commentCell);

        // Add star rating
        const starCell = document.createElement('td');
        starCell.classList.add('star-cell');
        const starRating = personData.starRating;
        const ratingText = document.createTextNode(starRating + ' '); // Add a space for better separation
        const starImage = document.createElement('img');
        starImage.src = 'star.png'; // Replace with the actual path to your star image
        starImage.style.width = '20px'; // Adjust width as desired
        starImage.style.height = '20px'; // Adjust height as desired
        starCell.appendChild(ratingText);
        starCell.appendChild(starImage);
        dataRow.appendChild(starCell);

        // Add review score
        const reviewScoreCell = document.createElement('td');
        reviewScoreCell.textContent = personData.reviewScore;
        reviewScoreCell.style.width = '100px'; // Set desired width for review score cell

        if (personData.reviewScore === "Tích Cực") {
        reviewScoreCell.style.color = 'green';
        } else {
        reviewScoreCell.style.color = 'red';
        }
        dataRow.appendChild(reviewScoreCell);
    }
    return table;
}
function createProductDisplay(productData) {
    const productContainerDiv = document.createElement('div');

    productContainerDiv.classList.add('product-container');

    const productImage = document.createElement('img');
    productImage.src = productData.image;
    productImage.alt = productData.title;
    productImage.classList.add('product-image');
    productContainerDiv.appendChild(productImage);

    const productInfoDiv = document.createElement('div');
    productInfoDiv.classList.add('product-info');

    const productTitle = document.createElement('h3');
    productTitle.classList.add('product-title');
    productTitle.textContent = productData.title;
    productInfoDiv.appendChild(productTitle);

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `Giá Thành: ${productData.price}`;
    productInfoDiv.appendChild(productPrice);

    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.textContent = productData.description;
    productInfoDiv.appendChild(productDescription);

    const totalComment = document.createElement('p');
    totalComment.classList.add('product-description');
    totalComment.textContent = `Tổng số bình luận: ${productData.TotalComment}`;
    productInfoDiv.appendChild(totalComment);

    const star = document.createElement('p');
    star.classList.add('product-description');
    star.textContent = `Điểm đánh giá trên web: ${productData.star}/5`;
    const starImage = document.createElement('img');
    star.classList.add('star-cell');
    starImage.src = 'star.png'; // Replace with the actual path to your star image
    starImage.style.width = '20px'; // Adjust width as desired
    starImage.style.height = '20px';
    star.appendChild(starImage)
    productInfoDiv.appendChild(star);

   

    productContainerDiv.appendChild(productInfoDiv);

    return productContainerDiv;
}
function clearAllTables() {
    const tables = tableContainer.querySelectorAll('table'); // Get all table elements
    tables.forEach(table => table.remove()); // Remove each table element
}

function clearAllBody(){
    if (tableContainer){
        tableContainer.parentNode.removeChild(tableContainer);
        tableContainer = null;
    }
}

//  add combo box
function addSelectedBox(){
    // Create the select element
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('select-dropdown-right');
    containerAll.appendChild(selectContainer)
    const commentFilterDropdown = document.createElement('select');
    commentFilterDropdown.id = 'commentFilterDropdown'; // Set the ID
    commentFilterDropdown.classList.add('select-dropdown');
    // Create options
    const allCommentsOption = document.createElement('option');
    allCommentsOption.value = 'allComments';
    allCommentsOption.textContent = 'Tất cả bình luận';



    const negativeCommentsOption = document.createElement('option');
    negativeCommentsOption.value = 'negativeComments';
    negativeCommentsOption.textContent = 'Bình luận Tiêu Cực';

    const positiveCommentsOption = document.createElement('option');
    positiveCommentsOption.value = 'positiveComments';
    positiveCommentsOption.textContent = 'Bình luận tích cực';

    // Append options to the select element
    commentFilterDropdown.appendChild(allCommentsOption);
    commentFilterDropdown.appendChild(negativeCommentsOption);
    commentFilterDropdown.appendChild(positiveCommentsOption);
    selectContainer.appendChild(commentFilterDropdown);
    // add listerner 
    commentFilterDropdown.addEventListener('change', function() {
        const selectedOption = this.value;
        filterComments(selectedOption);
    });
}

function filterComments(selectedOption) {
    if (selectedOption === previousSelection){
        return;
    }
    clearAllBody();
    // Replace this placeholder comment filtering logic with your actual implementation
    console.log('Selected option:', selectedOption);
    // Example logic using a hypothetical 'commentsData' array:
    let newTable;
    if (selectedOption === 'negativeComments') {
        createContainerWithHeader("Bình Luận Tiêu Cực") 
        newTable = createTableRows(10,true,"Tiêu Cực");
    } else if (selectedOption === 'positiveComments') {
        createContainerWithHeader("Bình luận tích cực") 
        newTable = createTableRows(10,true,"Tích Cực");
    } else if (selectedOption === 'allComments') {
        createContainerWithHeader("Tất cả bình luận") 
        newTable = createTableRows(10,true);
    }
    tableContainer.appendChild(newTable);
}
