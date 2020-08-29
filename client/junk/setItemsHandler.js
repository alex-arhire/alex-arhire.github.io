/*Handler for pushing data into LOCAL STORAGE for both wishlist and shopping cart pages
* Also handles data displayed on the product details page
* */

const productsTemplate = document.querySelector('.products-template');

function distributeItems(event) {
    event.preventDefault();
    console.log(event.target);
    const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));

    if (event.target.classList.contains('wishlist') || event.target.classList.contains('cart')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let items = {
                    id: obj.id,
                    image: obj.img,
                    title: obj["prod-name"],
                    price: obj.price
                };
                if (event.target.classList.contains('wishlist')) {
                    let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                    wishlistStorage.push(items);
                    localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));
                } else if (event.target.classList.contains('cart')) {
                    let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                    cartStorage.push(items);
                    localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
                }
            }
        });
    } else if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {

        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let items = {
                    id: obj.id,
                    image: obj.img,
                    title: obj["prod-name"],
                    price: obj.price,
                    desc: obj.description
                };
                let detailsStorage = JSON.parse(localStorage.getItem("prodForDetails")) || [];
                detailsStorage = items;
                localStorage.setItem("prodForDetails", JSON.stringify(detailsStorage));
                window.location.href = '../productDetails.html';
            }
        });
    }
}

productsTemplate.addEventListener('click', distributeItems);


// const wishlistBtn = document.querySelectorAll('.wihslist');
// const cartBtn = document.querySelectorAll('.cart');
// const productTable = document.querySelector('.prod-table');

/*
function distributeItems(event) {
    event.preventDefault();
    console.log(event.target);

    // if (window.location.href === 'http://localhost:8080/bikes.html' || 'http://localhost:8080/equipment.html' || 'http://localhost:8080/components.html') {
        if (event.target.classList.contains('wishlist') /!*|| event.target.classList.contains('cart')*!/) {
            let image = event.target.parentNode.childNodes[0].getAttribute('src');
            let title = event.target.parentNode.childNodes[1].innerHTML;
            let price = event.target.parentNode.childNodes[2].innerHTML;
            let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
            let items = {
                image,
                title,
                price
            };
            wishlistStorage.push(items);
            localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));

        } else if (event.target.classList.contains('cart')) {
            let image = event.target.parentNode.childNodes[0].getAttribute('src');
            let title = event.target.parentNode.childNodes[1].innerHTML;
            let price = event.target.parentNode.childNodes[2].innerHTML;
            let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
            let items = {
                image,
                title,
                price
            };
            cartStorage.push(items);
            localStorage.setItem("prodForCart", JSON.stringify(cartStorage));

        } else if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
            window.location.href = 'http://localhost:8080/productDetails.html';
        }
}

products.addEventListener('click', distributeItems);
*/

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

// function ready() {
// }
/*
function distributeItems2() {
    if (window.location.href === 'http://localhost:8080/bikes.html' || 'http://localhost:8080/equipment.html' || 'http://localhost:8080/components.html') {
        const productsDiv = document.querySelector('.products-template');

        function sendFromProdPages(event) {
            event.preventDefault();
            console.log(event.target);
            if (event.target.classList.contains('wishlist') /!*|| event.target.classList.contains('cart')*!/) {
                let image = event.target.parentNode.childNodes[0].getAttribute('src');
                let title = event.target.parentNode.childNodes[1].innerHTML;
                let price = event.target.parentNode.childNodes[2].innerHTML;
                let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                let items = {
                    image,
                    title,
                    price
                };
                wishlistStorage.push(items);
                localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));

            } else if (event.target.classList.contains('cart')) {
                let image = event.target.parentNode.childNodes[0].getAttribute('src');
                let title = event.target.parentNode.childNodes[1].innerHTML;
                let price = event.target.parentNode.childNodes[2].innerHTML;
                let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                let items = {
                    image,
                    title,
                    price
                };
                cartStorage.push(items);
                localStorage.setItem("prodForCart", JSON.stringify(cartStorage));

            } else if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
                window.location.href = 'http://localhost:8080/productDetails.html';
            }
        }

        productsDiv.addEventListener('click', sendFromProdPages);

    } else if (window.location.href === 'http://localhost:8080/wishlist.html') {
        const productTable = document.querySelector('.prod-table');

        function sendFromWishlist(event) {
            event.preventDefault();
            console.log(event.target);
            if (event.target.classList.contains('cart')) {
                let image = event.target.parentNode.childNodes[0].getAttribute('src');
                let title = event.target.parentNode.childNodes[1].innerHTML;
                let price = event.target.parentNode.childNodes[2].innerHTML;
                let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                let items = {
                    image,
                    title,
                    price
                };
                cartStorage.push(items);
                localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
            }
        }
        productTable.addEventListener('click', sendFromWishlist);
    }
}

document.addEventListener('DOMContentLoaded', distributeItems2);*/
