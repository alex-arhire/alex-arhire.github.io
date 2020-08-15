/**Calculating the total number of items for the cart and wishlist icons**/
// import MethodHandler from "./methodHandler";

function cartItems() {
    const CART_STORAGE = JSON.parse(localStorage.getItem("prodForCart"));
    let cartCounter = document.getElementById('cart-icon');
    cartCounter.innerHTML = CART_STORAGE.length + `<img src="./img/Site_Icons/output-onlinepngtools(1).png">`;
    // var content = window.getComputedStyle(
    //     document.querySelector('#cart-icon'), ':before'
    // ).getPropertyValue('content');
    // content.style.setProperty("content", CART_STORAGE.length);
}

function wishlistItems() {
    const WISHLIST_STORAGE = JSON.parse(localStorage.getItem("prodForWishlist"));
    let wishlistCounter = document.getElementById('wishlist-icon');
    wishlistCounter.innerHTML = WISHLIST_STORAGE.length + `<img src="./img/Site_Icons/wishlist3.png">`;
    // wishlistCounter.style.setProperty("--wishlistContent", WISHLIST_STORAGE.length);
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


