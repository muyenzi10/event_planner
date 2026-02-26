const express = require("express");
const multer = require("multer");
const path = require("path");
const photography = express.Router();
const photography_video = require("../controllers/photography");

const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,"../all_disk/camera_images"))
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
    })
const upload = multer({storage})
photography.post("/upload/media", requireAuth,restrictTo("user","admin"),upload.single("media"),photography_video.postphotography);
photography.get("/photographers", photography_video.getphotograph);
photography.get("/dashboard/media",requireAuth,restrictTo("user","admin"),photography_video.getdashbord);
photography.get("/add/media",requireAuth,restrictTo("user","admin"), photography_video.addmedia);
photography.get("/edit/media/:id", requireAuth,restrictTo("user","admin"),photography_video.editmedia);
photography.put("/update/media/:id", requireAuth,restrictTo("user","admin"),upload.single("media"), photography_video.updatemedia);
photography.delete("/delete/media/:id",requireAuth,restrictTo("user","admin"), photography_video.deletemedia);
module.exports = photography