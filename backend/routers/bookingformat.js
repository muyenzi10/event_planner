const express = require('express');
const router = express.Router();
const {requireAuth} = require("../middleware/jwtaut");
const bookingformat = require("../controllers/bookingcontroller");
router.get("/Dashboard/booking",requireAuth,bookingformat.getbookformat);
router.get("/bookings/:id", bookingformat.readdata);
router.put("/bookings/:id", bookingformat.updatedata);
router.delete("/bookings/:id", bookingformat.deletedata);
module.exports = router;