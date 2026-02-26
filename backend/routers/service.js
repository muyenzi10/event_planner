const express = require("express");
const servicerouter = express.Router()
const servicecontroller = require("../controllers/service")
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
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
servicerouter.post("/upload/service", requireAuth,restrictTo("user","admin"), upload.single("media"),servicecontroller.postservice );
servicerouter.get("/hospitality",servicecontroller.getservice);
servicerouter.get("/service/add",requireAuth,restrictTo("user","admin"), servicecontroller.getadd);
servicerouter.get("/service/edit/:id",requireAuth,restrictTo("user","admin"), servicecontroller.getedit);
servicerouter.get("/dashboard/services",requireAuth,restrictTo("user","admin"), servicecontroller.getdashboard);
servicerouter.put("/update/service/:id", requireAuth,restrictTo("user","admin"), upload.single("media"), servicecontroller.updateservice);
servicerouter.delete("/delete/service/:id",requireAuth,restrictTo("user","admin"),  servicecontroller.deleteservice);
module.exports = servicerouter;