const productsContainer = document.querySelector('.products-template');

// const addToCartBtns = document.getElementsByClassName('cart');

/*
class RenderProducts {
    constructor(productList = []) {
        this.products = productList;
    }

    render() {
        this.products.forEach(object => {
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

            productsContainer.appendChild(div);
        });
    }
}
*/

function populateProducts(products = []) {
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

        productsContainer.appendChild(div);
    });
}

class MethodHandler {
    constructor(route, id, method, body) {
        this.route = route;
        this.method = method;
        this.body = body;
        this.id = id;
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

const bikeHandler = new MethodHandler('http://localhost:3000/bikes', 'GET');
bikeHandler.sendRequest().then(populateProducts);

const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));

productsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('cart')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                const cartHandler = new MethodHandler("http://localhost:3000/cart", `${obj.id}`,'POST', JSON.stringify({
                        id: obj.id,
                        img: obj.img,
                        name: obj["prod-name"],
                        price: obj.price,
                        quantity: 1,
                    }
                ));
                cartHandler.sendRequest().then(populateProducts);
            }
        })
    }
});

/*
function loadProducts(page) {
    return fetch(`http://localhost:3000/${page}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}

loadProducts('bikes').then(populateProducts);*/

/*const buttons = Object.entries(addToCartBtns);
console.log(buttons);
buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', addToCart);
});*/

