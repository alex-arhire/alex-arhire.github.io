/**Calculating the total number of items for the cart and wishlist icons**/
// import MethodHandler from "./methodHandler";

/*function sendRequest(lookupValue) {
    return fetch(`http://localhost:3000/bikes?search=${lookupValue}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}*/

/*var searchInput = document.getElementById('search');
searchInput.addEventListener('keydown', event => {
    event.preventDefault();
    /!*const search = new MethodHandler(`http://localhost:3000/bikes${searchInput.value}`, 'GET', null);
    search.then(populateProducts);*!/
    setTimeout(function () {

    sendRequest(searchInput.value).then(populateProducts);
    }, 2000);
});*/

/*function populateProducts(products = []) {
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

        document.querySelector('.products-template').appendChild(div);
    });
}*/

function cartItems() {
    const CART_STORAGE = JSON.parse(localStorage.getItem("prodForCart"));
    let cartCounter = document.getElementById('cart-icon');
    cartCounter.innerHTML = CART_STORAGE.length + `<img src="./img/CartLogo.PNG">`;
    // cartCounter.style.setProperty("--cartContent", CART_STORAGE.length);
    console.log(CART_STORAGE.length);
}

function wishlistItems() {
    const WISHLIST_STORAGE = JSON.parse(localStorage.getItem("prodForWishlist"));
    let wishlistCounter = document.getElementById('wishlist-icon');
    wishlistCounter.innerHTML = WISHLIST_STORAGE.length + `<img src="./img/WishlistLogo.png">`;
    // wishlistCounter.style.setProperty("--wishlistContent", WISHLIST_STORAGE.length);
    console.log(WISHLIST_STORAGE.length);
}

document.addEventListener('click', event => {
    switch (true) {
        case event.target.classList.contains('cart'):
            cartItems();
            break;
        case event.target.classList.contains('wishlist'):
            wishlistItems();
            break;
        case event.target.classList.contains('prod-remove'):
            cartItems();
            wishlistItems();
            break;
        default:
            break;
    }
});

cartItems();
wishlistItems();


