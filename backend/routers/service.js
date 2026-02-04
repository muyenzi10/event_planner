const express = require("express");
const servicerouter = express.Router()
const servicecontroller = require("../controllers/service")
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/service"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage})
servicerouter.post("/upload/service", upload.single("media"),servicecontroller.postservice );
servicerouter.get("/hospitality",servicecontroller.getservice);
servicerouter.get("/service/add",servicecontroller.getadd);
servicerouter.get("/service/edit/:id",servicecontroller.getedit);
servicerouter.get("/dashboard/services",servicecontroller.getdashboard);
servicerouter.put("/update/service/:id", upload.single("media"), servicecontroller.updateservice);
servicerouter.delete("/delete/service/:id", servicecontroller.deleteservice);
module.exports = servicerouter;