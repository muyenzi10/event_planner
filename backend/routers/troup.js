const express = require("express");
const trouprouter = express.Router();
const multer = require("multer")
const path = require("path")
const troup = require("../controllers/troupe");
const { requireAuth, restrictTo } = require("../middleware/jwtaut");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,"../all_disk/troupe_images"));
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const troupeupload = multer({storage:storage})
trouprouter.post("/upload/troupe/image", requireAuth,restrictTo("user","admin"),troupeupload.single("media"),troup.postroupe)
trouprouter.get("/add/media/troupe", requireAuth,restrictTo("user","admin"),troup.getadd);
trouprouter.get("/edit/media/troupe/:id",requireAuth,restrictTo("user","admin"),requireAuth,restrictTo("user","admin"), troup.getEdit);
trouprouter.get("/dashboard/troupe",troup.gettroupedashboad);
trouprouter.put("/update/troupe/:id",requireAuth,restrictTo("user","admin"), troupeupload.single("media"), troup.updatetroupe)
trouprouter.delete("/delete/troupe/:id", requireAuth,restrictTo("user","admin"),troup.deletetroupe)
trouprouter.get("/troupe", troup.getindinzi);

module.exports=trouprouter;