const express = require("express");
const nav = require("../controllers/controller");
const router = express.Router();
// about
router.get("/about", nav.getabout);
// supply
router.get("/suppliers", nav.getsupply);
router.get("/booking", nav.getbook);

module.exports = router;