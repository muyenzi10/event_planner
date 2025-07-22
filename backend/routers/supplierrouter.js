const routersupplier = require("../controllers/supplier");
const express = require("express");
const supplierformat = require("../controllers/controller");
const {requireAuth} = require("../middleware/jwtaut")
const supplierrouter = express.Router();

supplierrouter.post("/submit", routersupplier.postsupplier);
supplierrouter.get("/Dashboard/suppliers",requireAuth,supplierformat.getsuppliersformat);
module.exports = supplierrouter;