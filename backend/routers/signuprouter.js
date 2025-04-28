const autosignup = require("../controllers/autoconrtoller");
const express = require("express");
const routersauto = express.Router();
routersauto.post("/direct/signup",autosignup.postsignup);
module.exports=  routersauto;