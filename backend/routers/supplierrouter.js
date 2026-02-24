const routersupplier = require("../controllers/supplier");
const express = require("express");
const supplierformat = require("../controllers/controller");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const supplierrouter = express.Router();

supplierrouter.post("/submit", routersupplier.postsupplier);
supplierrouter.get("/Dashboard/view/suppliers",requireAuth,restrictTo("admin"),routersupplier.getsuppliers);
// routes/supplierrouter.js
supplierrouter.get("/Dashboard/suppliers/edit/:id",requireAuth,restrictTo("admin"), routersupplier.readsuppliers);
supplierrouter.put("/Dashboard/suppliers/update/:id",requireAuth,restrictTo("admin"), routersupplier.updateSuppliers);
supplierrouter.delete("/Dashboard/suppliers/delete/:id",requireAuth,restrictTo("admin"), routersupplier.deleteSuppliers)

module.exports = supplierrouter;