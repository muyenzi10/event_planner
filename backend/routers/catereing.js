const express = require("express");
const cateringrouter = express.Router();

const path = require("path");
const multer = require("multer");
const cater = require("../controllers/cateringcontroller");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/catering"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
//public router 
//cateringrouter.get("/catering", cater.getcatering);
//-----------------------
//private router
cateringrouter.post("/upload/catering",upload.single("media"),cater.postupload);
cateringrouter.get("/catering", cater.getcatering);
cateringrouter.get("/dashboard/catering", requireAuth,cater.getdash);
cateringrouter.get("/add/catering", requireAuth,cater.getadd);
cateringrouter.get("/edit/catering/:id", requireAuth,cater.getedit);
cateringrouter.put("/update/catering/:id", requireAuth,upload.single("media"), cater.updatecatering)
cateringrouter.delete("/delete/catering/:id", requireAuth,cater.deletecatering);
module.exports = cateringrouter
//muyenzi20@ 