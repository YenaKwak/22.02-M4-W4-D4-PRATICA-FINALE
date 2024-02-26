const url = "https://striveschool-api.herokuapp.com/api/product/";
const myAuthorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YTJjZjljNDM3MDAwMTkzYzM1YzkiLCJpYXQiOjE3MDg0MzQxMjcsImV4cCI6MTcwOTY0MzcyN30.i5YvIJD9BJ_dnGkyTjXBhH7H2B-GasTHxvLODPauhWA';


document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('pid'); //쿼리스트링
    
    if(productId){
        fetchProductDetail(productId);
    }

    const prevButton = document.getElementById('prevButton');
    if(prevButton){
        prevButton.addEventListener('click', () => window.history.back());
    }
});

async function fetchProductDetail(productId){
    const apiUrl = `${url}${productId}`;

    try {
        const response = await fetch(apiUrl, {
            headers:{
                'Authorization': myAuthorization
            }
        });
        const product = await response.json();
        displayProductsDetail(product);
    } catch (error) {
            console.log('Error fetching details', error);
    }
}


function displayProductsDetail(product){
    const productsDetailContainer = document.getElementById('products-detail');
    productsDetailContainer.innerHTML = `
    <div class="text-center my-5">
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 350px;">
            <h5 class="fw-bold pb-2 pt-5">${product.name}</h5>
            <p class="fst-italic">Visit the &lt;${product.name}&gt;</p>
            <p class="mt-3">${product.description}</p>
            <p class="fw-bold">Price : €${product.price}</p>
        </div>
    `;
}








document.addEventListener("DOMContentLoaded", function() {
    const adminButton = document.getElementById('adminButton');
    if (adminButton) {
        adminButton.addEventListener('click', () => {
            window.location.href = 'backoffice.html'; 
        });
    }
});
