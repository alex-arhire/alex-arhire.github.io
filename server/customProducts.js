const express = require("express");
const Chance = require("chance");
const productsRouter = express.Router();
const chance = new Chance();

var products = [
  {
    id: chance.guid(),
    name: "Trei intr-o barca",
    author: "Jerome K. Jerome",
    quantity: chance.natural({ min: 10, max: 30 }),
  },
  {
    id: chance.guid(),
    name: "1Q84",
    author: "Haruki Murakami",
    quantity: chance.natural({ min: 10, max: 30 }),
  },
  {
    id: chance.guid(),
    name: "Singur pe lume",
    author: "Hector Malot",
    quantity: chance.natural({ min: 10, max: 30 }),
  },
  {
    id: chance.guid(),
    name: "Dar daca vrem sa folosim un fisier...",
    author: "Alex Arhire",
    quantity: chance.natural({ min: 10, max: 30 }),
  },
];

productsRouter.get("/", function (request, response) {
  response.send(products);
});

// route parameter
productsRouter.get("/:productId", function (request, response) {
  const productId = request.params.productId;

  const product = products.find(function (p) {
    return p.id === productId;
  });

  if (product) {
    return response.send(product);
  }

  return response.send("Not found.");
});

productsRouter.post("/", function (request, response) {
  const body = request.body;

  const newProduct = {
    id: chance.guid(), // global unique id
    name: body.name,
    author: body.author,
    quantity: body.quantity || 0,
  };

  products.push(newProduct);

  response.send(newProduct);
});

productsRouter.delete("/:productId", function (request, response) {
  const productId = request.params.productId;

  // immutable - NU iti modifica array-ul initial
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

module.exports = productsRouter;
