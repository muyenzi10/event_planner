const express = require("express");
const homerouter = express.Router();
const path = require("path")
const multer = require("multer");
const homecontroller = require("../controllers/home");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/home"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
homerouter.post("/upload/home",requireAuth,restrictTo("user","admin"), upload.single("media"),homecontroller.postupload);
homerouter.get("/", homecontroller.gethome);
homerouter.get("/home", homecontroller.gethome);
homerouter.get("/add/home", requireAuth,restrictTo("user","admin"),homecontroller.getadd);
homerouter.get("/edit/home/:id",requireAuth,restrictTo("user","admin"), homecontroller.getedit);
homerouter.get("/dashboard/home", requireAuth,restrictTo("user","admin"),homecontroller.getdashboard);
homerouter.put("/update/home/:id", requireAuth,restrictTo("user","admin"),upload.single("media"),homecontroller.updatehome);
homerouter.delete("/delete/home/:id", requireAuth,restrictTo("user","admin"),homecontroller.delete);
module.exports = homerouter;