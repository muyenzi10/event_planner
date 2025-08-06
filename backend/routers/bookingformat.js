const express = require('express');
const router = express.Router();
const {requireAuth} = require("../middleware/jwtaut");
const bookingformat = require("../controllers/bookingcontroller");
router.get("/Dashboard/booking",requireAuth,bookingformat.getbookformat);
router.get("/Dashboard/booking/edit/:id", bookingformat.readdata);
router.put("/Dashboard/booking/update/:id", bookingformat.updatedata);
router.delete("/Dashboard/booking/delete/:id", bookingformat.deletedata);
module.exports = router;