const express = require("express");
const routersign = express.Router();
const signup = require("../controllers/autoconrtoller");
const getsig = require("../controllers/controller");
// POST route for booking submission
routersign.post("/direct/api/signup", signup.postsignup);
routersign.get("/direct/api/signup", getsig.getsignup);
module.exports = routersign;