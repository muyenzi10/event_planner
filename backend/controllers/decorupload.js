const File = require("../models/upload");
exports.postupload =async(req, res)=>{
    try{
    if(!req.file){
        res.status(400).json({message:"No file uploaded"})
    };
    const Newimage = File({
      title: req.body.title,
      description: req.body.description,
      filePath: req.file.filename,
      fileType: req.file.mimetype.startsWith("image") ? "image" : "video"  
    })
   await Newimage.save();
   res.redirect("/decor")
    }catch(error){
        console.error(error)
        res.status(500).send("Error uploading file")
    }
}
exports.getdecor = async(req, res)=>{
    try{
    const files = await File.find().sort({createdAt: -1});
    res.render("allpack/venues/venues", {files})
    }catch(error){
        console.error(error);
        res.status(500).send("not found")
    }
};
exports.getupload = (req,res)=>{
    try {
        res.render("allpack/uploads/upload")
    } catch (error) {
        console.error(error);
        res.status(500).send("not found")
    }
}