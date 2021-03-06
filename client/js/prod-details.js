/**Imports**/

/**Handler for retrieving data from LOCAL STORAGE for product details pages**/

// const STORAGE = JSON.parse(localStorage.getItem(('prodForDetails')));

var image = document.getElementById('image1');
var slideImage1 = document.getElementById('slide-image1');
var slideImage2 = document.getElementById('slide-image2');
var slideImage3 = document.getElementById('slide-image3');
var slideImage4 = document.getElementById('slide-image4');
var title = document.querySelector('.prod-title');
var price = document.querySelector('.prod-price');
var desc = document.getElementById('prod-description');
var detailsContainer = document.querySelector('.prod-details-container');

function sendRequest(prodID) {
    return fetch(`http://localhost:3000/productDetails?search=${prodID}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}

/*function sendRequest2(prodID) {
    return fetch(`http://localhost:3000/productDetailsTest`, {
        host: `/productDetails.html?prodID=${prodID}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}*/

function loadProducts() {
    /*    detailsContainer.setAttribute('id', STORAGE.id);
        image.src = STORAGE.image;
        title.innerText = STORAGE.title;
        price.innerText = STORAGE.price;
        desc.innerText = STORAGE.description;*/
    // let prodId = window.location.search.slice(42);
    let prodId = window.location.search.match(/\d+/g);
    console.log(prodId);
    sendRequest(prodId).then(response => {
        detailsContainer.setAttribute('id', response[0].id);
        image.src = response[0].img;
        slideImage1.src = response[0].img1;
        slideImage2.src = response[0].img2;
        slideImage3.src = response[0].img3;
        slideImage4.src = response[0].img4;
        title.innerText = response[0]["prod-name"];
        price.innerText = response[0].price;
        desc.innerText = response[0].description;
    })
}

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});




