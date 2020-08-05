const tableItems = document.querySelector('.prod-table > tbody');

function populateProducts(cart = []) {

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

function loadProducts() {
    return fetch("http://localhost:3000/cart", {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(r => r.json());
}

loadProducts().then(populateProducts);
