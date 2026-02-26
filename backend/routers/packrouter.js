const express = require("express");
const routerpack = express.Router();
const path = require("path")
const multer = require("multer");
const pack = require("../controllers/pack");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/packges"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
routerpack.post("/upload/packges", requireAuth,restrictTo("user","admin"),upload.single("media"),pack.packupload);
routerpack.get("/services", pack.getpackages);
routerpack.get("/packages/add", requireAuth,restrictTo("user","admin"),pack.add);
routerpack.get("/packages/edit/:id", requireAuth,restrictTo("user","admin"),pack.edit);
routerpack.get("/packages/dashboard", requireAuth,restrictTo("user","admin"),pack.dash);
routerpack.put("/update/packages/:id", requireAuth,restrictTo("user","admin"),upload.single("media"),pack.updatepack);
routerpack.delete("/delete/packages/:id",requireAuth,restrictTo("user","admin"), pack.deletepack);
module.exports = routerpack;