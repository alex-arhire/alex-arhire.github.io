const express = require("express");
const productsRouter = express.Router();
const prodList = require("./../data/bikesData");
const equipList = require('./../data/equipmentData');
const compList = require('./../data/componentsData');

var cart = [];
var wishlist = [];

//GET handlers
productsRouter.get("/bikes", function (request, response) {
    response.send(prodList);
});

productsRouter.get("/equipment", function (request, response) {
    response.send(equipList);
});

productsRouter.get("/components", function (request, response) {
    response.send(compList);
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

//POST handlers
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

//DELETE handlers
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

productsRouter.patch("/cart/:productId", (req, res) => {
    const productId = req.params.productId;
    const body = req.body;
    console.log(cart);
    console.log(req.body);
    let product = cart.find(p => p.id === productId);

    if (!product) {
        return res.send("Not found.");
    } else {
        product = {
            id: body.id,
            img: body.img,
            name: body.name,
            price: body.price,
            quantity: body.quantity
        };
        Object.assign(product, body);
    }
    res.send(product);
});

module.exports = productsRouter;
