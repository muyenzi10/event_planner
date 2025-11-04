const File = require("../models/upload");
const fs = require("fs");
const path = require("path");
exports.postupload = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const Newimage = new File({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.filename,
            fileType: req.file.mimetype.startsWith("image") ? "image" : "video"
        });

        await Newimage.save();
        res.redirect("/dashboard/decor");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
};
// get format of decor
exports.getDecorformat = async (req, res) => {
  try {
    const itemsPerPage = 5; // number of items per page
    const currentPage = parseInt(req.query.page) || 1; // current page from query, default 1

    // total number of documents
    const totalItems = await File.countDocuments();

    // fetch paginated documents
    const files = await File.find()
      .sort({ createdAt: -1 }) // make sure your schema has timestamps
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.render("allpack/venues/decorformat", {
      files,
      currentPage,
      totalPages,
       itemsPerPage
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Not found files");
  }
};
// get add format
exports.getDecoradd = async(req,res)=>{
    res.render("allpack/venues/add")
}
// edit format
exports.getDecorEdit = async (req, res) => {
  try {
    const file = await File.findById(req.params.id); // ✅ 'params' not 'paramas'

    if (!file) {
      return res.status(404).send("File not found");
    }

    res.render("allpack/venues/editVenue", { file });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
exports.updatedecor = async(req,res)=>{
    try {
        const file = await File.findById(req.params.id);
        if(!file){
            return res.status(404).send("not found file")
        }
        file.title = req.body.title;
        file.description = req.body.description;
        // delete old file
        if(req.file){
        const oldpath = path.join(__dirname,"../all_disk/decor_images", file.filePath);
        if(fs.existsSync(oldpath)){
            fs.unlinkSync(oldpath);
        }
        file.filePath = req.file.filename;
        file.fileType = req.file.mimetype.startsWith("image")? "image" : "video"
       
    }
    await file.save();
    res.redirect("/dashboard/decor") 
}catch (error) {
        console.error(error);
        res.status(500).send("server not found")
    }
   

}
// delete decor
exports.deletedecor = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }

    // Delete file from disk
    const oldpath = path.join(__dirname, "../all_disk/decor_images", file.filePath);
    if (fs.existsSync(oldpath)) {
      fs.unlinkSync(oldpath);
    }

    // Delete from DB
    await File.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard/decor");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
