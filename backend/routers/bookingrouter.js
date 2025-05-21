const express = require("express");
const routerbooking = express.Router();
const bookingrouter = require("../controllers/bookingcontroller");
routerbooking.post("/booking/submit", bookingrouter.postbook);
module.exports = routerbooking;