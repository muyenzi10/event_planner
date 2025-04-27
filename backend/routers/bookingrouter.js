const express = require("express");
const routerbooking = express.Router();
const bookingrouter = require("../controllers/bookingcontroller");
routerbooking.post("/direct/booking", bookingrouter.postbook);
routerbooking.get("/direct/booking", bookingrouter.postbook);
module.exports = routerbooking;