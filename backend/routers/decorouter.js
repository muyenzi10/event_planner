const express = require("express");
const uploadimage = require("../controllers/decorupload");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const path = require("path");
const multer = require("multer");
//const { requireAuth, restrictTo } = require("../middleware/jwtaut")
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
uploadrouter.post("/decor/upload", requireAuth,restrictTo("user","admin"),upload.single("file"),uploadimage.postupload);
uploadrouter.get("/dashboard/decor", requireAuth,restrictTo("user","admin"),uploadimage.getDecorformat);
uploadrouter.get("/add/decor", requireAuth,restrictTo("user","admin"),uploadimage.getDecoradd);
uploadrouter.get("/decor/edit/:id", requireAuth,restrictTo("user","admin"), uploadimage.getDecorEdit);
uploadrouter.put("/update/decor/:id", requireAuth,restrictTo("user","admin"), upload.single("file"),uploadimage.updatedecor);
uploadrouter.delete("/delete/file/:id", requireAuth,restrictTo("user","admin"), uploadimage.deletedecor);
// router for client
uploadrouter.get("/decor", uploadimage.getdecorclient);
module.exports = uploadrouter;