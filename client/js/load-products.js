/**Imports**/
import MethodHandler, {RenderProducts, search} from './method-handler.js';

/**Checking page location**/
let container;
let location = window.location.href;

function checkLocation() {
    switch (true) {
        case location === "http://localhost:8080/bikes.html":
            container = document.querySelector('.products-template');
            break;
        case location === "http://localhost:8080/equipment.html":
            container = document.querySelector('.products-template');
            break;
        case location === "http://localhost:8080/components.html":
            container = document.querySelector('.products-template');
            break;
        case location === "http://localhost:8080/home.html":
            container = document.querySelector('.home-page-container');
            break;
        case location.includes('http://localhost:8080/productDetails.html'):
            container = document.querySelector('.text-details');
            break;
        case location === "http://localhost:8080/wishlist.html":
            container = document.querySelector('.prod-table');
            break;
        default:
            break;
    }
    return container;
}

checkLocation();

/**Fetching products data from the server**/
switch (window.location.href) {
    case "http://localhost:8080/bikes.html":
        const bikeHandler = new MethodHandler('http://localhost:3000/bikes?search=');
        bikeHandler.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
        search('bikes');
        break;
    case "http://localhost:8080/equipment.html":
        const equipHandler = new MethodHandler('http://localhost:3000/equipment?search=');
        equipHandler.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
        search('equipment');
        break;
    case "http://localhost:8080/components.html":
        const compHandler = new MethodHandler('http://localhost:3000/components?search=');
        compHandler.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
        search('components');
        break;
    default:
        break;
}

/**Function that handles adding to cart/wishlist from products, product details, home and wishlist pages**/

function addProducts() {
    /**Searching for existing products in LOCAL STORAGE**/
    container.addEventListener('click', event => {
        const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
        event.preventDefault();
        if (event.target.classList.contains('cart')) {
            FROM_STORAGE.forEach(obj => {
                let parsedID;
                if (window.location.href.includes('http://localhost:8080/productDetails.html')) {
                    console.log(window.location.href);
                    parsedID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'), 10);
                } else {
                    parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                }
                if (parsedID === obj.id) {
                    let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                    let product = cartStorage.find(p => p.id === parsedID);
                    if (product) {
                        /*const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH', JSON.stringify({
                            quantity: 1,
                        }));
                        cartHandler.sendRequest();*/
                        console.log(document.querySelector('.pop-up'));
                        document.querySelector('.pop-up').style.display = 'initial';
                        setTimeout(function () {
                            document.querySelector('.pop-up').style.display = 'none';
                        }, 4000);
                    } else {
                        const cartHandler = new MethodHandler("http://localhost:3000/cart", 'POST', JSON.stringify({
                                id: obj.id,
                                img: obj.img,
                                name: obj["prod-name"],
                                price: obj.price,
                                quantity: '1',
                            }
                        ));
                        cartHandler.sendRequest();
                        cartStorage.push(JSON.parse(cartHandler.body));
                        localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
                    }
                }
            })
        } else if (event.target.classList.contains('wishlist')) {
            FROM_STORAGE.forEach(obj => {
                let parsedID;
                if (window.location.href.includes('http://localhost:8080/productDetails.html')) {
                    console.log(event.target);
                    parsedID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'), 10);
                } else {
                    parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                }
                if (parsedID === obj.id) {
                    let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                    let product = wishlistStorage.find(p => p.id === parsedID);
                    if (product) {
                        /*const wishlistStorage = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH', JSON.stringify({
                            quantity: 1,
                        }));*/
                        // wishlistStorage.sendRequest();
                        document.querySelector('.pop-up2').style.display = 'initial';
                        setTimeout(function () {
                            document.querySelector('.pop-up2').style.display = 'none';
                        }, 4000);
                    } else {
                        const wishlistHandler = new MethodHandler("http://localhost:3000/wishlist", 'POST', JSON.stringify({
                                id: obj.id,
                                img: obj.img,
                                name: obj["prod-name"],
                                price: obj.price,
                                quantity: 1,
                            }
                        ));
                        wishlistHandler.sendRequest();
                        wishlistStorage.push(JSON.parse(wishlistHandler.body));
                        localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));
                    }
                }
            })
        }
    })
}

addProducts();

/**Changes data on the product details page dynamically**/
if (window.location.href === "http://localhost:8080/bikes.html" || window.location.href === "http://localhost:8080/equipment.html" || window.location.href === "http://localhost:8080/components.html") {
    container.addEventListener('click', event => {
        /**Searching for existing products in LOCAL STORAGE**/
        if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
            let prodID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            window.location.href = `../productDetails.html?prodID=${prodID}`;
        }
    });
}

/**Set focus**/
/*
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        console.log(document.querySelector(".filters"));
        document.querySelector(".filters").focus();
    }, 1000);
});
*/
