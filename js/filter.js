import MethodHandler, {RenderProducts} from "./methodHandler.js";

/**Search function**/

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

/**Function for handling product filtering**/
const productsToFilter = document.querySelector('.products-template');

const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
let filteredArray = [];
let checkboxItems = Array.from(document.querySelectorAll('input[type=checkbox]'));

function check() {
    if (filteredArray.length === 0) {
        const resetList = new RenderProducts(FROM_STORAGE, productsToFilter);
        resetList.render();
    }
}

function filter(event) {
    productsToFilter.innerHTML = '';
    const FILTERED_PROD = FROM_STORAGE.filter(item => {
        return event.target.value === item[event.target.className];
    });
    if (event.target.checked) {
        filteredArray.push({type: event.target.value, products: FILTERED_PROD});
        render(filteredArray);
    } else {
        filteredArray = filteredArray.filter(item => item.type !== event.target.value);
        render(filteredArray);
    }
}

function render(list) {
    list.forEach(item => {
        const newList = new RenderProducts(item.products, productsToFilter);
        newList.render();
    });
}

checkboxItems.forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
        filter(event);
        check();
    })
});

