const express = require("express");
const uploadimage = require("../controllers/decorupload");
const path = require("path");
const multer = require("multer");
const uploadrouter = express.Router();
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, "decor_images")
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
uploadrouter.post("/upload", upload.single("file"),uploadimage.postupload);
uploadrouter.get("/decor",uploadimage.getdecor);
uploadrouter.get("/upload",uploadimage.getupload);
module.exports = uploadrouter;