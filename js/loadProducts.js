const productsContainer = document.querySelector('.products-template');
const addToCartBtns = document.getElementsByClassName('cart');
console.log(addToCartBtns);

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

function loadProducts() {
    return fetch("http://localhost:3000/bikes", {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}

loadProducts().then(populateProducts);


/*const buttons = Object.entries(addToCartBtns);
console.log(buttons);
buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', addToCart);
});*/
productsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('cart')) {
        return fetch("http://localhost:3000/bikes", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id: body.id,
                img: body.img,
                name: body.name,
                price: body.price,
                quantity: 1,
            })
        }).then((r => r.json()));
    }
});

