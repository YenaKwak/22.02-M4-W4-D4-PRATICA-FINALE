const url = "https://striveschool-api.herokuapp.com/api/product/";
const myAuthorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YTJjZjljNDM3MDAwMTkzYzM1YzkiLCJpYXQiOjE3MDg0MzQxMjcsImV4cCI6MTcwOTY0MzcyN30.i5YvIJD9BJ_dnGkyTjXBhH7H2B-GasTHxvLODPauhWA';
const inputAlert = document.getElementById("alert-msg");



document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();

    const prevButton = document.getElementById('prevButton');
    if (prevButton) {
        prevButton.addEventListener('click', () => window.history.back());
    }

    const addProductForm = document.getElementById('addProductForm');
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addProduct();
    });

    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', (event) => {
            event.preventDefault();
            updateProduct();
        });
    }
});




async function fetchProducts() {
 try {
        const response = await fetch(url, {
            headers: {'Authorization': myAuthorization}
        });
        const products = await response.json();
        displayProductsInTable(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}




//현재상품들 테이블 map 이용!
function displayProductsInTable(products) {
    const tableBody = document.getElementById('productsTableBody');
    tableBody.innerHTML = products.map((product, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td><img src="${product.imageUrl}" alt="Product Image" style="width: 50px; height: auto;"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.brand}</td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-id="${product._id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product._id}">Delete</button>
            </td>
        </tr>
    `).join('');





//edit 과 delete 버튼에 이벤트리스터 추가
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        editProduct(productId);
    });
});

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        deleteProduct(productId);
    });
});
};





//상품들 수정하는 폼 설정
async function editProduct(productId){
    try{
        const response = await fetch(`${url}/${productId}`, {
            headers: {'Authorization': myAuthorization}
        });
        const product = await response.json();

        document.getElementById('editProductId').value = product._id;
        document.getElementById('editName').value = product.name;
        document.getElementById('editdescription').value = product.description;
        document.getElementById('editbrand').value = product.brand;
        document.getElementById('editimageUrl').value = product.imageUrl;
        document.getElementById('editprice').value = product.price;


        const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
        modal.show();
    }catch(error){
        console.error('error fetching', error);
    }
}


//PUT modify product 수정하기
async function updateProduct(){
    const productId = document.getElementById('editProductId').value;
    const productName = document.getElementById('editName').value;
    const productDescription = document.getElementById('editdescription').value;
    const productBrand = document.getElementById('editbrand').value;
    const productImage = document.getElementById('editimageUrl').value;
    const productPrice = document.getElementById('editprice').value;

    try{
        const response = await fetch(`${url}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': myAuthorization
            },
            body: JSON.stringify({
                name: productName,
                description: productDescription,
                brand: productBrand,
                imageUrl: productImage,
                price: productPrice
            })
        });
            if(response.ok){
                alert("product updated");
                fetchProducts();
            }
    }catch(error){
        console.log('error updating', error);
    }
}



//Delete product 삭제하기!!
async function deleteProduct(productId){
    const deleteUrl = `${url}${productId}`; 
    try{
        const response = await fetch(deleteUrl, {
            method:'DELETE',
            headers:{'Authorization': myAuthorization}                   
        });
        if (response.ok){
            alert("Product deleted");
            fetchProducts();
        } 
        }catch(error){
        console.log('Error deleting', error);
        }
        }




/* <div class="container my-5">
  <form id="addProductForm">
          <input type="text" id="addName" placeholder="Name" required>
          <input type="text" id="addImg" placeholder="Image url" required>
          <input type="text" id="addDesc" placeholder="Description" required>
          <input type="text" id="addBrand" placeholder="Brand" required>
          <input type="number" id="addPrice" placeholder="Price" required>
          <button type="submit" id="addBtn" class="btn btn-success btn-sm">Add product</button>
  </form>
</div> */
        



// POST  Add product 추가!
    async function addProduct(){
        const name = document.getElementById('addName').value;
        const description = document.getElementById('addDesc').value; 
        const brand = document.getElementById('addBrand').value;
        const imageUrl = document.getElementById('addImg').value; 
        const price = document.getElementById('addPrice').value;

     if(name && description && brand && imageUrl && price){
        try{
            const response = await fetch(url, {
            method : 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': myAuthorization},
            body: JSON.stringify({name, description, brand, imageUrl, price})
            });

            if(response.ok){
                console.log('Product added');
                fetchProducts();
                inputAlert.classList.toggle("d-none");
                setTimeout(() => {
                inputAlert.classList.toggle("d-none");
                }, 5000);
            }
                }catch(error) {
                    console.log('Error adding', error);
                }
            }
        }