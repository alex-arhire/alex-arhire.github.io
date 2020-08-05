const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const users = [];
authRoutes.post("/signUp", (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(newUser);

  const token = jwt.sign(newUser, JWT_SECRET);

  res.json({
    token,
  });
});

module.exports = authRoutes;
