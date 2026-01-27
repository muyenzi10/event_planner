const express = require("express");
const nav = require("../controllers/controller");
const router = express.Router();
// about
router.get("/about", nav.getabout);
// packages
router.get("/packages", nav.getpackages);
// supply
router.get("/suppliers", nav.getsupply);
// booking
router.get('/booking', nav.getbook);
module.exports = router;