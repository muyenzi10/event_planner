const express = require('express');
const router = express.Router();
const bookingformat = require("../controllers/bookingcontroller");
router.get("/Dashboard/booking", bookingformat.getbookformat);
module.exports = router;