const express = require("express");
const productsRouter = express.Router();
const prodList = require("./data/bikesData");
const equipList = require('./data/equipmentData');
const compList = require('./data/componentsData');

var cart = [];
var wishlist = [];

/*class ProdHandler {
    constructor(route, products, method) {
        this.route = route;
        this.products = products;
        this.method = method;
    }

    request() {
        productsRouter.this.method(this.route, function (request, response) {
            response.sendRequest(this.products);
        })
    }
}*/

/**GET handlers**/
productsRouter.get("/bikes", function (request, response) {
    if (request.query.search !== "undefined") {
        let searched = prodList.filter(prod =>
                // [...prod["prod-name"], ...prod.category, ...prod["frame-size"], ...prod["wheel-size"], ...prod.suspension].includes(request.query.search)
            prod["prod-name"].concat(prod.category).includes(request.query.search)
        );
        response.send(searched);
        //response.send(library.filter(book => book.title.concat(book.author).includes(request.query.search)))
    } else {
        response.send(prodList)
    }
});

productsRouter.get("/productDetails", function (request, response) {
    let list = [...prodList, ...equipList, ...compList];
    if (request.query.search !== "undefined") {
        let prod = list.filter(prod => prod.id == request.query.search
        );
        console.log(prod);
        response.send(prod);
    } else {
        response.send(list);
    }
});

/*
productsRouter.get("/productDetailsTest", function (request, response) {
    console.log(request.query);
});
*/

productsRouter.get("/equipment", function (request, response) {
    if (request.query.search !== "undefined") {
        var searched = equipList.filter(prod =>
            prod["prod-name"].concat(prod.category).includes(request.query.search)
        );
        response.send(searched);
    } else {
        response.send(equipList);
    }
});

productsRouter.get("/components", function (request, response) {
    if (request.query.search !== "undefined") {
        var searched = compList.filter(prod =>
            prod["prod-name"].concat(prod.category).includes(request.query.search)
        );
        response.send(searched);
    } else {
        response.send(compList)
    }
});

productsRouter.get("/cart", function (request, response) {
    response.send(cart);
});

productsRouter.get("/wishlist", function (request, response) {
    response.send(wishlist);
});

productsRouter.get("/:productId", function (request, response) {
    const productId = request.params.productId;

    const product = prodList.find(function (p) {
        return p.id === productId;
    });

    if (product) {
        return response.send(product);
    }

    return response.send("The item you are looking for does not exist.");
});

productsRouter.get("/:productId", function (request, response) {
    const productId = request.params.productId;

    const product = equipList.find(function (p) {
        return p.id === productId;
    });

    if (product) {
        return response.send(product);
    }

    return response.send("The item you are looking for does not exist.");
});

productsRouter.get("/:productId", function (request, response) {
    const productId = request.params.productId;

    const product = compList.find(function (p) {
        return p.id === productId;
    });

    if (product) {
        return response.send(product);
    }

    return response.send("The item you are looking for does not exist.");
});

/**POST handlers**/
productsRouter.post("/cart", function (request, response) {
    const body = request.body;

    const cartProduct = {
        id: body.id,
        img: body.img,
        name: body.name,
        price: body.price,
        quantity: 1,
    };

    cart.push(cartProduct);
    response.send(cartProduct);
});

productsRouter.post("/wishlist", function (request, response) {
    const body = request.body;

    const wishlistProduct = {
        id: body.id,
        img: body.img,
        name: body.name,
        price: body.price,
        quantity: 1,
    };

    wishlist.push(wishlistProduct);
    response.send(wishlistProduct);
});

/**DELETE handlers**/
productsRouter.delete("/cart/:productId", function (request, response) {
    const productId = parseInt(request.params.productId, 10);
    cart = cart.filter(p => p.id !== productId);
    response.send(cart);
});

productsRouter.delete("/wishlist/:productId", function (request, response) {
    const productId = parseInt(request.params.productId, 10);
    wishlist = wishlist.filter(p => p.id !== productId);
    response.send(wishlist);
});

/**PATCH handlers**/
/*productsRouter.patch("/cart/:productId", (req, res) => {
    const productId = req.params.productId;
    const body = req.body;

    let qty = parseInt(body.quantity, 10) + 1;
    console.log(qty);
    let product = cart.find(p => p.id = productId);

    if (!product) {
        return res.send("Not found.");
    } else {
        let productIndex = cart.findIndex((obj => obj == product));
        cart[productIndex].quantity = 2;
        console.log(cart);
        // Object.assign(product, body);
    }
    res.send(product);
});*/

module.exports = productsRouter;
