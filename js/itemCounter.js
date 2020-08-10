/**Calculating the total number of items for the cart and wishlist icons**/

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

