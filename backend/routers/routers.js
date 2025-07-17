const express = require("express");
const nav = require("../controllers/controller");
const router = express.Router();
//home page
router.get("/", nav.gethome);
router.get("/home", nav.gethome);
// about
router.get("/about", nav.getabout);
// packages
router.get("/packages", nav.getpack);
// supply
router.get("/suppliers", nav.getsupply);
// booking
router.get('/booking', nav.getbook);
router.get('/Dashboard/suppliers', nav.getsuppliersformat);
//router.get('/Dashboard/booking',nav.getbookformat);
router.get('/signup', nav.signup);
//router.get('/direct/myaccount/login', nav.login);
module.exports = router;