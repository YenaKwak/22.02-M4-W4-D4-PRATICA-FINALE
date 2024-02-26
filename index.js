const url ="https://striveschool-api.herokuapp.com/api/product/";
const myAuthorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YTJjZjljNDM3MDAwMTkzYzM1YzkiLCJpYXQiOjE3MDg0MzQxMjcsImV4cCI6MTcwOTY0MzcyN30.i5YvIJD9BJ_dnGkyTjXBhH7H2B-GasTHxvLODPauhWA";



//데이터가져오기
async function fetchProducts() {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': myAuthorization}
        });
        if (!response.ok) throw new Error(`fetching error occurred`);
        const products = await response.json();
        displayProducts(products); // 가져온 상품 데이터를 displayProducts 함수에 전달하여 화면에 표시
    } catch (error) {
        console.log('Error fetching products:', error);
    }
}
fetchProducts();



//상품목록화면
function displayProducts(products){
    const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'col-xl-3 col-lg-6 col-md-6 col-sm-12 my-5';
            productElement.innerHTML = `
                <div class="card my-3 mx-auto text-center" style="width: 18rem;">
                <a href="details.html?pid=${product._id}"><img src="${product.imageUrl}" class="card-img-top" alt="${product.name}"></a>
                    <div class="card-body">
                        <h6 class="card-title fw-bold">${product.name}</h6>
                        <p class="card-text text-truncate">${product.description}</p>
                        <p class="fw-bold card-text">$${product.price}</p>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
    }




    document.addEventListener("DOMContentLoaded", function() {
        const adminButton = document.getElementById('adminButton');
        if (adminButton) {
            adminButton.addEventListener('click', () => {
                window.location.href = 'backoffice.html'; 
            });
        }
    });


    


