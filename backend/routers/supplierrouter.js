const routersupplier = require("../controllers/supplier");
const express = require("express");
const supplierrouter = express.Router();

supplierrouter.post("/submit", routersupplier.postsupplier);
module.exports = supplierrouter;