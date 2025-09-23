const routersupplier = require("../controllers/supplier");
const express = require("express");
const supplierformat = require("../controllers/controller");
const {requireAuth} = require("../middleware/jwtaut")
const supplierrouter = express.Router();

supplierrouter.post("/submit", routersupplier.postsupplier);
supplierrouter.get("/Dashboard/view/suppliers",routersupplier.getsuppliers);
// routes/supplierrouter.js
supplierrouter.get("/Dashboard/suppliers/edit/:id", routersupplier.readsuppliers);
supplierrouter.put("/Dashboard/suppliers/update/:id", routersupplier.updateSuppliers);
supplierrouter.delete("/Dashboard/suppliers/delete/:id", routersupplier.deleteSuppliers)

module.exports = supplierrouter;