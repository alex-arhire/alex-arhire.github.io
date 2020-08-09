/**Handler for retrieving data from LOCAL STORAGE for product details pages**/
// import {addProducts} from "./loadProducts";

const STORAGE = JSON.parse(localStorage.getItem(('prodForDetails')));

var image = document.getElementById('image1');
var title = document.getElementsByClassName('prod-title')[0];
var price = document.getElementsByClassName('prod-price')[0];
var desc = document.getElementById('prod-description');
var detailsContainer = document.querySelector('.prod-details-container');

function loadProducts() {
    detailsContainer.setAttribute('id', STORAGE.id);
    image.src = STORAGE.image;
    title.innerText = STORAGE.title;
    price.innerText = STORAGE.price;
    desc.innerText = STORAGE.description;
}

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});




