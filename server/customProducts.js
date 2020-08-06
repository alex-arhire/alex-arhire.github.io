const express = require("express");
const productsRouter = express.Router();
const prodList = require("./../data/bikesData");
const x = require('./test');
console.log(x);

var cart = [];

productsRouter.get("/bikes", function (request, response) {
  response.send(prodList);
});

productsRouter.get("/cart", function (request, response) {
  response.send(cart);
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

productsRouter.post("/bikes", function (request, response) {
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
  console.log(cart);
});

/*
productsRouter.delete("/:productId", function (request, response) {
  const productId = request.params.productId;
  products = products.filter(p => p.id !== productId);

  response.send(productId);
});

productsRouter.patch("/:productId", (req, res) => {
  const productId = req.params.productId;
  const body = req.body;

  let product = products.find(p => p.id === productId);

  if (!product) {
    return res.send("Not found.");
  }

  Object.assign(product, body);

  res.send(product);
});
*/

module.exports = productsRouter;
