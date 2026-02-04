const express = require("express");
const trouprouter = express.Router();
const multer = require("multer")
const path = require("path")
const troup = require("../controllers/troupe");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,"../all_disk/troupe_images"));
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const troupeupload = multer({storage:storage})
trouprouter.post("/upload/troupe/image", troupeupload.single("media"),troup.postroupe)
trouprouter.get("/add/media/troupe", troup.getadd);
trouprouter.get("/edit/media/troupe/:id", troup.getEdit);
trouprouter.get("/dashboard/troupe",troup.gettroupedashboad);
trouprouter.put("/update/troupe/:id", troupeupload.single("media"), troup.updatetroupe)
trouprouter.delete("/delete/troupe/:id", troup.deletetroupe)
trouprouter.get("/troupe", troup.getindinzi);

module.exports=trouprouter;