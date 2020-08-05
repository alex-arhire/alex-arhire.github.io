const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOP_SECRET";

const users = [];
authRoutes.post("/login", (req, res) => {
  const newUser = {
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
