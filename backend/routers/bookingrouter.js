const express = require("express");
const routerbooking = express.Router();
const bookingrouter = require("../controllers/bookingcontroller");
routerbooking.post("/bo", bookingrouter.postbook);
module.exports = routerbooking;