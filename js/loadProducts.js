/**Imports**/
import MethodHandler, {RenderProducts} from './methodHandler.js';

/**Checking page location**/
let container;

function checkLocation() {
    switch (window.location.href) {
        case "http://localhost:8080/bikes.html":
            container = document.querySelector('.products-template');
            break;
        case "http://localhost:8080/equipment.html":
            container = document.querySelector('.products-template');
            break;
        case "http://localhost:8080/components.html":
            container = document.querySelector('.products-template');
            break;
        case "http://localhost:8080/homeGrid2.html":
            container = document.querySelector('.home-page-container');
            break;
        case "http://localhost:8080/productDetails.html":
            container = document.querySelector('.text-details');
            break;
        case "http://localhost:8080/wishlist.html":
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
        break;
    case "http://localhost:8080/equipment.html":
        const equipHandler = new MethodHandler('http://localhost:3000/equipment');
        equipHandler.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
        break;
    case "http://localhost:8080/components.html":
        const compHandler = new MethodHandler('http://localhost:3000/components');
        compHandler.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
    default:
        break;
}

/**Search functionality**/

setTimeout(function () {
    var searchInput = document.getElementById('search-bar');
    searchInput.addEventListener('blur', event => {
        const search = new MethodHandler(`http://localhost:3000/bikes?search=${searchInput.value}`);
        event.preventDefault();
        search.sendRequest().then(function (response) {
            const renderList = new RenderProducts(response, document.querySelector('.products-template'));
            renderList.render();
        });
    });
}, 500);

/**end search**/

/**Function that handles adding to cart/wishlist from products, product details, home and wishlist pages**/
function addProducts() {
    /**Searching for existing products in LOCAL STORAGE**/
    const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
    container.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.classList.contains('cart')) {
            FROM_STORAGE.forEach(obj => {
                let parsedID;
                if (window.location.href === 'http://localhost:8080/productDetails.html') {
                    parsedID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'), 10);
                } else {
                    parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                }
                if (parsedID === obj.id) {
                    let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                    let product = cartStorage.find(p => p.id === parsedID);
                    if (product) {
                        const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH', JSON.stringify({
                            quantity: 1,
                        }));
                        cartHandler.sendRequest();
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
                if (window.location.href === 'http://localhost:8080/productDetails.html') {
                    console.log(event.target);
                    parsedID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'), 10);
                } else {
                    parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                }
                if (parsedID === obj.id) {
                    let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                    let product = wishlistStorage.find(p => p.id === parsedID);
                    if (product) {
                        const wishlistStorage = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH', JSON.stringify({
                            quantity: 1,
                        }));
                        wishlistStorage.sendRequest();
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
        const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
        if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
            FROM_STORAGE.forEach(obj => {
                let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                if (parsedID === obj.id) {
                    let items = {
                        id: obj.id,
                        image: obj.img,
                        title: obj["prod-name"],
                        price: obj.price,
                        description: obj.description
                    };
                    let detailsStorage = JSON.parse(localStorage.getItem("prodForDetails")) || [];
                    detailsStorage = items;
                    localStorage.setItem("prodForDetails", JSON.stringify(detailsStorage));
                    window.location.href = 'http://localhost:8080/productDetails.html';
                }
            });
        }
    });
}
