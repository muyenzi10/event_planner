const login = require("../controllers/login");
const controller = require("../controllers/controller")
const express = require('express');
const loginaut  = express.Router();
loginaut.post("/direct/myaccount/login", login.postlogin);
loginaut.get("/direct/myaccount/login",controller.login);

module.exports = loginaut;