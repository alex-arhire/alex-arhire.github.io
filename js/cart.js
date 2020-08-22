/**Imports**/
import MethodHandler from './method-handler.js';

/**Rendering the DOM elements**/
const tableItems = document.querySelector('.prod-table > tbody');

function populateProducts(items = []) {
    tableItems.innerHTML = '';
    items.forEach(item => {
        var tr = document.createElement('tr');
        tr.className = 'cart-item';
        tr.id = item.id;

        var td = document.createElement('td');
        var img = document.createElement('img');
        img.src = item.img;
        td.appendChild(img);
        tr.appendChild(td);

        td = document.createElement('td');
        var a = document.createElement('a');
        a.textContent = item.name;
        a.href = '#';
        td.appendChild(a);
        tr.appendChild(td);

        td = document.createElement('td');
        var price = document.createElement('a');
        price.textContent = item.price;
        td.className = 'prod-price';
        td.appendChild(price);
        tr.appendChild(td);

        td = document.createElement('td');
        var qt = document.createElement('input');
        qt.type = 'number';
        qt.value = item.quantity;
        qt.className = 'quantity';
        qt.setAttribute('min', '1');
        td.appendChild(qt);
        tr.appendChild(td);

        if (window.location.href === "http://localhost:8080/wishlist.html") {
            td = document.createElement('td');
            td.className = 'add-cart';
            var buttonCart = document.createElement('button');
            buttonCart.className = 'cart';
            buttonCart.textContent = 'Add to Cart';
            td.appendChild(buttonCart);
            tr.appendChild(td);
        }

        td = document.createElement('td');
        var buttonRemove = document.createElement('a');
        buttonRemove.href = '#';
        td.className = 'prod-remove';
        td.appendChild(buttonRemove);
        tr.appendChild(td);

        tableItems.appendChild(tr);
    });
}

/**Searching for existing products in LOCAL STORAGE**/
const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));

/**Adding items from the Wishlist page to the cart**/
tableItems.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('cart')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
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
        })
    }
});

/**Deleting items from storage**/
function removeItemFromStorage(event, storage, key) {
    let FROM_STORAGE = storage;
    FROM_STORAGE.forEach(obj => {
        let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
        if (parsedID === obj.id) {
            let index = FROM_STORAGE.indexOf(obj);
            FROM_STORAGE.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(FROM_STORAGE));
        }
    });
}

if (window.location.href === 'http://localhost:8080/cartCheckout.html') {
    const cart = new MethodHandler("http://localhost:3000/cart");
    cart.sendRequest().then(populateProducts).then(updateTotal);

    /**Deleting items from the CART**/
    tableItems.addEventListener('click', event => {
        var itemId = event.target.parentNode.getAttribute("id");
        if (event.target.classList.contains('prod-remove')) {
            const cartHandler = new MethodHandler(`http://localhost:3000/cart/${itemId}`, 'DELETE');
            cartHandler.sendRequest().then(populateProducts).then(updateTotal);
        }
        removeItemFromStorage(event, JSON.parse(localStorage.getItem('prodForCart')), 'prodForCart');
    });

    /**Deleting items from the WISHLIST**/
} else if (window.location.href === 'http://localhost:8080/wishlist.html') {
    const wishlist = new MethodHandler("http://localhost:3000/wishlist");
    wishlist.sendRequest().then(populateProducts).then(updateTotal);
    tableItems.addEventListener('click', event => {
        var itemId = event.target.parentNode.getAttribute("id");
        if (event.target.classList.contains('prod-remove')) {
            const wishlistHandler = new MethodHandler(`http://localhost:3000/wishlist/${itemId}`, 'DELETE');
            wishlistHandler.sendRequest().then(populateProducts).then(updateTotal);
        }
        removeItemFromStorage(event, JSON.parse(localStorage.getItem('prodForWishlist')), 'prodForWishlist');
    });
}

/**Calculating total**/
let shipping = document.querySelectorAll('input[type=checkbox]');

function updateTotal() {
    let cartItem = document.getElementsByClassName('cart-item');
    let total = 0;
    const checkedItem = Array.from(shipping).find(option => option.checked);
    if (checkedItem) {
        total = parseFloat(checkedItem.value);
    }
    for (var i = 0; i < cartItem.length; i++) {
        var cartData = cartItem[i];
        var price = parseFloat(cartData.getElementsByClassName('prod-price')[0].innerText.replace('$', '').replace(',', ''));
        var quantity = cartData.getElementsByClassName('quantity')[0].valueAsNumber;
        total += (price * quantity);
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

function qtyChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

shipping.forEach(checkbox => {
    checkbox.addEventListener('click', updateTotal);
});

tableItems.addEventListener('change', event => {
    if (event.target.classList.contains('quantity')) {
        qtyChanged(event);
    }
});

/**Finish checkout**/
let checkoutBtn = document.getElementById('checkout');
let cartContainer = document.querySelector('.shop-cart');
function checkedOut() {
    cartContainer.innerHTML = "Thank you for placing an order with us. A confirmation email will be sent to you shortly.";
    localStorage.removeItem('prodForCart');
}
checkoutBtn.addEventListener('click', function () {
    checkedOut();
    cartItems();
});

/**Empty cart**/
function emptyCart() {
    const cart = new MethodHandler("http://localhost:3000/cart");
    cart.sendRequest().then(function (response) {
        if (response.length === 0) {
            cartContainer.innerHTML = "There are currently no items in your shopping cart.";
        }
    })
}

document.addEventListener('DOMContentLoaded', emptyCart);