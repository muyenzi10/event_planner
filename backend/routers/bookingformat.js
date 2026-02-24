const express = require('express');
const router = express.Router();
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const bookingformat = require("../controllers/bookingcontroller");
router.get("/Dashboard/booking",requireAuth,restrictTo("admin"),bookingformat.getbookformat);
router.get("/Dashboard/booking/edit/:id",requireAuth,restrictTo("admin"), bookingformat.readdata);
router.put("/Dashboard/booking/update/:id", requireAuth,restrictTo("admin"),bookingformat.updatedata);
router.delete("/Dashboard/booking/delete/:id", requireAuth,restrictTo("admin"),bookingformat.deletedata);
module.exports = router;