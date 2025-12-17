const express = require("express");
const cateringrouter = express.Router();
const path = require("path");
const multer = require("multer");
const cater = require("../controllers/cateringcontroller");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/catering"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
cateringrouter.post("/upload/catering", upload.single("media"),cater.postupload);
cateringrouter.get("/catering", cater.getcatering);
cateringrouter.get("/dashboard/catering", cater.getdash);
cateringrouter.get("/add/catering", cater.getadd);
cateringrouter.get("/edit/catering/:id", cater.getedit);
cateringrouter.put("/update/catering/:id", upload.single("media"), cater.updatecatering)
cateringrouter.delete("/delete/catering/:id", cater.deletecatering);
module.exports = cateringrouter