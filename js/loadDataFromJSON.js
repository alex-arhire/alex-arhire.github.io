/**The purpose of this function is to get the data from the JSON files and display it on the respective page
(Bikes, Equipment and Components pages)**/

const products = document.querySelector('.products-template');

function loadProducts() {
    const request = new XMLHttpRequest();
    if (window.location.href === 'http://localhost:8080/bikes.html' || window.location.href === 'https://alex-arhire.github.io/bikes.html' || window.location.href === 'http://127.0.0.1:5500/bikes.html') {
        request.open("get", "./../data/bikesData.json");
    } else if (window.location.href === 'http://localhost:8080/equipment.html' || window.location.href === 'https://alex-arhire.github.io/equipment.html' || window.location.href === 'http://127.0.0.1:5500/equipment.html') {
        request.open("get", "./../data/equipmentData.json");
    } else if (window.location.href === 'http://localhost:8080/components.html' || window.location.href === 'https://alex-arhire.github.io/components.html' || window.location.href === 'http://127.0.0.1:5500/components.html') {
        request.open("get", "./../data/componentsData.json");
    }
    request.onload = function () {
        try {
            const json = JSON.parse(request.responseText);
            localStorage.setItem('productsForStorage', JSON.stringify(json));
        } catch (e) {
            console.log("Could not load products");
        }
    };
    request.send();
}
loadProducts();

// document.addEventListener("DOMContentLoaded", loadProducts);



