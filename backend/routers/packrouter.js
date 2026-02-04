const express = require("express");
const routerpack = express.Router();
const path = require("path")
const multer = require("multer");
const pack = require("../controllers/pack");
const storage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null, path.join(__dirname, "../all_disk/packges"));
        },
    filename:(req,file,cb)=> {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage});
routerpack.post("/upload/packges", upload.single("media"),pack.packupload);
routerpack.get("/services", pack.getpackages);
routerpack.get("/packages/add", pack.add);
routerpack.get("/packages/edit/:id", pack.edit);
routerpack.get("/packages/dashboard", pack.dash);
routerpack.put("/update/packages/:id", upload.single("media"),pack.updatepack);
routerpack.delete("/delete/packages/:id", pack.deletepack);
module.exports = routerpack;