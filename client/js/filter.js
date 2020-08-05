/*Function for handling product filtering*/
var filters = document.querySelector('.filters');
const products = document.querySelector('.products-template');

function filter(event) {
    products.innerHTML = '';
    const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
    const FILTERED_PROD = FROM_STORAGE.filter(item => {
        switch (true) {
            case event.target.parentNode.parentNode.classList.contains('by-category'):
                return event.target.value === item.category;
            case event.target.parentNode.parentNode.classList.contains('by-frame-size'):
                return event.target.value === item['frame-size'];
            case event.target.parentNode.parentNode.classList.contains('by-suspension'):
                return event.target.value === item.suspension;
            case event.target.parentNode.parentNode.classList.contains('by-wheel-size'):
                return event.target.value === item['wheel-size'];
            default:
                return item;
        }
    });

    for (var i = 0; i < FILTERED_PROD.length; i++) {
        var object = FILTERED_PROD[i];

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

filters.addEventListener("click", filter);