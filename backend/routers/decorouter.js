const express = require("express");
const uploadimage = require("../controllers/decorupload");
const path = require("path");
const multer = require("multer");
const uploadrouter = express.Router();
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/decor_images"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
uploadrouter.post("/decor/upload", upload.single("file"),uploadimage.postupload);
uploadrouter.get("/dashboard/decor",uploadimage.getDecorformat);
uploadrouter.get("/add/decor",uploadimage.getDecoradd);
uploadrouter.get("/decor/edit/:id", uploadimage.getDecorEdit);
uploadrouter.put("/update/decor/:id", upload.single("file"),uploadimage.updatedecor);
uploadrouter.delete("/delete/file/:id", uploadimage.deletedecor);
module.exports = uploadrouter;