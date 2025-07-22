const express = require('express');
const router = express.Router();
const {requireAuth} = require("../middleware/jwtaut");
const bookingformat = require("../controllers/bookingcontroller");
router.get("/Dashboard/booking",requireAuth,bookingformat.getbookformat);
module.exports = router;