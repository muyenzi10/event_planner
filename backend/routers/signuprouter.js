const express = require("express");
const routersign = express.Router();
const signup = require("../controllers/autoconrtoller");
// POST route for booking submission
routersign.post("/direct/signup", signup.postsignup);
module.exports = routersign;