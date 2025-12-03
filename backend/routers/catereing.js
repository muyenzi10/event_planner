const express = require("express");
const cateringrouter = express.Router();
const cater = require("../controllers/cateringcontroller");
cateringrouter.get("/catering", cater.getcatering);
cateringrouter.get("/dashboard/catering", cater.getdash);
cateringrouter.get("/add/catering", cater.getadd);
cateringrouter.get("/edit/catering", cater.getedit);
module.exports = cateringrouter