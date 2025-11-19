const express = require("express");
const multer = require("multer");
const path = require("path");
const photography = express.Router();
const photography_video = require("../controllers/photography");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,"../all_disk/camera_images"))
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
    })
const upload = multer({storage})
photography.post("/media", upload.single("media"));
photography.get("/photographers", photography_video.getphotograph);
module.exports = photography