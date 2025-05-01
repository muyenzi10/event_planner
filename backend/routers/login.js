const login = require("../controllers/login");
const express = require('express');
const loginaut  = express.Router();
loginaut.post("/login", login.postlogin);

module.exports = loginaut;