const File = require("../models/troupe");
const path = require("path");
const fs = require("fs")
exports.postroupe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const newImage = new File({
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      filePath: req.file.filename,
      fileType: req.file.mimetype.startsWith("image") ? "image" : "video"
    });

    await newImage.save();
    res.redirect("/dashboard/troupe");
  } catch (error) {
    console.error("Error uploading troupe file:", error);
    res.status(500).send("Server error while uploading troupe file");
  }
};

exports.getindinzi = async (req, res) => {
  try {
    const itemsPerPage = 18;
    const currentPage = parseInt(req.query.page) || 1; // Current page
    const totalItems = await File.countDocuments(); // Total files
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Total pages

    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip((currentPage - 1) * itemsPerPage) // Corrected parentheses
      .limit(itemsPerPage);

   const allFiles = await File.find().sort({ uploadedAt: -1 });       
    res.render("allpack/indinzi/troup/indinzi", {
      files,
      allFiles,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.gettroupedashboad = async (req, res) => {
    try {
        const itemsPerPage = 5;
        const currentPage = parseInt(req.query.page) || 1
        totalitems = await File.countDocuments();
        totalpage = Math.ceil(totalitems / itemsPerPage);
        const files= await File.find().sort({uploadedAt: -1})
        .skip((currentPage -1) * itemsPerPage)
        .limit(itemsPerPage)
        res.render("allpack/indinzi/troup/troupformat", { files,
          itemsPerPage,
          currentPage,
          totalitems
         });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

exports.getadd =async(req,res)=>{
    res.render("allpack/indinzi/troup/add")
}
exports.getEdit =async(req,res)=>{
    try {
        const file = await File.findById(req.params.id);
        if(!file){
            return res.status(400).send("not found file");
        }
         res.render("allpack/indinzi/troup/edit", {file})

    } catch (error) {
        console.error(error);
        res.status(500).send("server error")
    }
      
}
exports.updatetroupe = async(req,res)=>{
  try{
 const file = await File.findById(req.params.id);
 if(!file){
  return res.status(400).send("file not found")
 }
 // update title and description
 file.title = req.body.title
 file.description = req.body.description
 // upadate image we gonna delete old image
 if(req.file){
const oldpath =  path.join(__dirname, "../all_disk/troupe_images", file.filePath);
if(fs.existsSync(oldpath)){
  fs.unlinkSync(oldpath)
}
file.filePath = req.file.filename;
file.fileType = req.file.mimetype.startsWith("image")? "image" : "video"

 }
await file.save()
res.redirect("/dashboard/troupe")

  }catch(error){
    console.error(error)
    res.status(500).send("server error")
  }
}
exports.deletetroupe = async(req, res)=>{
  try{
  const file = await File.findById(req.params.id)
  if(!file){
    return res.status(400).send("file not found")
  }
  // delete
  const oldpath = path.join(__dirname,"../all_disk/troupe_images", file.filePath);
  if(fs.existsSync(oldpath)){
    fs.unlinkSync(oldpath)
  } 
  await File.findByIdAndDelete(req.params.id)
  res.redirect("/dashboard/troupe")
}catch(error){
  console.error(error)
  res.status(500).send("Server error")
}
}