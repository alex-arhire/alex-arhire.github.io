/**This file defined classes fetch methods and render DOM method**/

export default class MethodHandler {
    constructor(route, method, body) {
        this.route = route;
        this.method = method;
        this.body = body;
    }

    sendRequest() {
        return fetch(`${this.route}`, {
            method: this.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: this.body
        }).then(r => r.json());
    }
}

export class RenderProducts {
    constructor(products, container) {
        this.products = products;
        this.container = container;
    }

    render() {
        this.container.innerHTML = '';
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

            this.container.appendChild(div);
        });
    }
}

/*class Filter {
    constructor() {
        this.filteredFunctions = [];
    }

    filterByCategory(category) {
        return item => item.category === category;
    }

    filterByFrameSize(size) {
        return item => item['frame-size'] === size;
    }

    filterBySuspension(suspension) {
        return item => item.suspension === suspension;
    }

    filterByWheelSize(wheel) {
        return item => item['wheel-size'] === wheel;
    }
}*/

/*
const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
let result = FROM_STORAGE;
const filtered = new Filter();



filtered.filteredFunctions.forEach(obj => {
    result = result.filter(obj);
});
*/

/*
class AddProducts {
    constructor(container,) {
        /!**Searching for existing products in LOCAL STORAGE**!/
        this.FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
        this.container = container;
    }

    addListener() {
        this.container.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.classList.contains('cart')) {
                this.FROM_STORAGE.forEach(obj => {
                    let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                    if (parsedID === obj.id) {
                        let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                        let product = cartStorage.find(p => p.id === parsedID);
                        console.log(cartStorage);
                        console.log(product);
                        if (product) {
                            const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH');
                            cartHandler.sendRequest();
                        } else {
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
                            console.log(JSON.parse(cartHandler.body));
                            localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
                        }
                    }
                })
            } else if (event.target.classList.contains('wishlist')) {
                FROM_STORAGE.forEach(obj => {
                    let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
                    if (parsedID === obj.id) {
                        const wishlistHandler = new MethodHandler("http://localhost:3000/wishlist", 'POST', JSON.stringify({
                                id: obj.id,
                                img: obj.img,
                                name: obj["prod-name"],
                                price: obj.price,
                                quantity: 1,
                            }
                        ));
                        wishlistHandler.sendRequest();
                        let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                        wishlistStorage.push(wishlistHandler.body);
                        localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));
                    }
                })
            }
        })

    }
}
*/


/*export function render(parentEl, products = []) {
        parentEl.forEach(object => {
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

        parentEl.appendChild(div);
    });
}*/


/*productsContainer.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('cart')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
                let product = cartStorage.find(p => p.id === parsedID);
                console.log(cartStorage);
                console.log(product);
                if (product) {
                    const cartHandler = new MethodHandler(`http://localhost:3000/cart/${parsedID}`, 'PATCH');
                    cartHandler.sendRequest();
                } else {
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
                    console.log(JSON.parse(cartHandler.body));
                    localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
                }
            }
        })
    } else if (event.target.classList.contains('wishlist')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                const wishlistHandler = new MethodHandler("http://localhost:3000/wishlist", 'POST', JSON.stringify({
                        id: obj.id,
                        img: obj.img,
                        name: obj["prod-name"],
                        price: obj.price,
                        quantity: 1,
                    }
                ));
                wishlistHandler.sendRequest();
                let wishlistStorage = JSON.parse(localStorage.getItem("prodForWishlist")) || [];
                wishlistStorage.push(wishlistHandler.body);
                localStorage.setItem("prodForWishlist", JSON.stringify(wishlistStorage));
            }
        })
    } else if (event.target.tagName.includes('IMG') || event.target.tagName.includes('A') || event.target.tagName.includes('SPAN')) {
        FROM_STORAGE.forEach(obj => {
            let parsedID = parseInt(event.target.parentNode.getAttribute('id'), 10);
            if (parsedID === obj.id) {
                let items = {
                    id: obj.id,
                    image: obj.img,
                    title: obj["prod-name"],
                    price: obj.price,
                    description: obj.description
                };
                let detailsStorage = JSON.parse(localStorage.getItem("prodForDetails")) || [];
                detailsStorage = items;
                localStorage.setItem("prodForDetails", JSON.stringify(detailsStorage));
                window.location.href = 'http://localhost:8080/productDetails.html';
            }
        });
    }
});*/