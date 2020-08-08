// import {MethodHandler} from './methodHandler';

const tableItems = document.querySelector('.prod-table > tbody');

function populateProducts(cart = []) {
    tableItems.innerHTML = '';
    cart.forEach(item => {
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

class MethodHandler {
    constructor(route, method, body) {
        this.route = route;
        this.method = method;
        this.body = body;
    }

    sendRequest() {
        return fetch(this.route, {
            method: this.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: this.body
        }).then(r => r.json());
    }
}

const cart = new MethodHandler("http://localhost:3000/cart");
cart.sendRequest().then(populateProducts);

tableItems.addEventListener('click', event => {
    var itemId = event.target.parentNode.getAttribute("id");
    if (event.target.classList.contains('prod-remove')) {
        const cartHandler = new MethodHandler(`http://localhost:3000/cart/${itemId}`, 'DELETE');
        cartHandler.sendRequest().then(populateProducts);
    }
});

/*Calculating total*/
function updateTotal() {
    let cartItem = document.getElementsByClassName('cart-item');
    let total = 0;
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

tableItems.addEventListener('change', event => {
    if (event.target.classList.contains('quantity')) {
        qtyChanged(event);
    }
});

tableItems.addEventListener('click', event => {
    if (event.target.classList.contains('prod-remove')) {
        updateTotal();
    }
});

document.addEventListener('DOMContentLoaded', updateTotal);
updateTotal();

