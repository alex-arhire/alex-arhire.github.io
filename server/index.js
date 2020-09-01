const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const auth = require("./auth");
const products = require("./customProducts");
const authorizedMiddleware = require("./authorized");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", auth);
app.use("/", authorizedMiddleware, products);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
