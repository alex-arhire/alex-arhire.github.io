import MethodHandler from './methodHandler.js';

/**Rendering the DOM elements**/
let container;
function checkLocation() {
    switch (window.location.href) {
        case "http://localhost:8080/bikes.html" || "http://localhost:8080/equipment.html" || "http://localhost:8080/components.html":
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

function populateProducts(products = []) {
    console.log(products);
    products.forEach(object => {
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

        container.appendChild(div);
    });
}

/**Fetching products data from the server**/
switch (window.location.href) {
    case "http://localhost:8080/bikes.html":
        const bikeHandler = new MethodHandler('http://localhost:3000/bikes');
        bikeHandler.sendRequest().then(populateProducts);
        break;
    case "http://localhost:8080/equipment.html":
        const equipHandler = new MethodHandler('http://localhost:3000/equipment');
        equipHandler.sendRequest().then(populateProducts);
        break;
    case "http://localhost:8080/components.html":
        const compHandler = new MethodHandler('http://localhost:3000/components');
        compHandler.sendRequest().then(populateProducts);
    default:
        break;
}

/*productsContainer.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('cart')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                let product = cartStorage.find(p => p.id === parsedID);
                console.log(cartStorage);
                console.log(product);
                if (product) {
                    const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH');
                    cartHandler.sendRequest();
                } else {
                    const cartHandler = new MethodHandler("http://localhost:3000/cart", 'POST', JSON.stringify({
                            id: obj.id,
                            img: obj.img,
                            name: obj["prod-name"],
                            price: obj.price,
                            quantity: 1,
                        }
                    ));
                    cartHandler.sendRequest();
                    cartStorage.push(JSON.parse(cartHandler.body));
                    console.log(JSON.parse(cartHandler.body));
                    localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
                }
            }
        })
    } else if (event.target.classList.contains('wishlist')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                const wishlistHandler = new MethodHandler("http://localhost:3000/wishlist", 'POST', JSON.stringify({
                        id: obj.id,
                        img: obj.img,
                        name: obj["prod-name"],
                        price: obj.price,
                        quantity: 1,
                    }
                ));
                wishlistHandler.sendRequest();
                let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                wishlistStorage.push(wishlistHandler.body);
                localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));
            }
        })
    } else if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
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
});*/

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
                    console.log(event.target);
                    parsedID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'), 10);
                } else {
                    parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                }
                if (parsedID === obj.id) {
                    let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                    let product = cartStorage.find(p => p.id === parsedID);
                    if (product) {
                        const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH');
                        cartHandler.sendRequest();
                    } else {
                        const cartHandler = new MethodHandler("http://localhost:3000/cart", 'POST', JSON.stringify({
                                id: obj.id,
                                img: obj.img,
                                name: obj["prod-name"],
                                price: obj.price,
                                quantity: 1,
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
