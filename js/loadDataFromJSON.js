/*The purpose of this function is to get the data from the JSON files and display it on the respective page
(Bikes, Equipment and Components pages)*/

//Dealing with potential global scope issues by using closure
(() => {
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
                populateProducts(json);
            } catch (e) {
                console.log("Could not load products");
            }
        };
        request.send();
    }

    function populateProducts(json) {
//Populate with data

        for (var i = 0; i < json.length; i++) {
            var object = json[i];

            for (var j in object) {
                var div = document.createElement('div');
                div.className = 'tile';
                div.id = object.id;

                var img = document.createElement('img');
                img.src = object.img;
                div.appendChild(img);

                var a = document.createElement('a');
                a.textContent = object["prod-name"];
                a.href = '#';
                div.appendChild(a);

                var price = document.createElement('span');
                price.textContent = object.price;
                price.className = 'prod-price';
                div.appendChild(price);

                var buttonCart = document.createElement('button');
                buttonCart.className = 'cart';
                buttonCart.textContent = 'Add to Cart';
                div.appendChild(buttonCart);

                var buttonWishlist = document.createElement('button');
                buttonWishlist.className = 'wishlist';
                buttonWishlist.textContent = 'Add to Wishlist';
                div.appendChild(buttonWishlist);
            }
            products.appendChild(div);
        }
    }

    document.addEventListener("DOMContentLoaded", loadProducts);

})();


