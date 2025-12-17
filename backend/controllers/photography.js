const File = require("../models/photography");
const path = require("path");
const fs = require("fs");
exports.postphotography = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).send("File not found");
        }

        const newphotors = new File({
            title: req.body.title || "Untitled",
            description: req.body.description || "",
            filePath: req.file.filename,
            fileType: req.file.mimetype.startsWith("image") ? "image" : "video"
        });

        await newphotors.save();
        res.redirect("/dashboard/media");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.getphotograph = async (req, res) => {
   try {
    const itempage = 12;
    const currentpage = parseInt(req.query.page) || 1;

    const totalItems = await File.countDocuments();

    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip((currentpage - 1) * itempage)
      .limit(itempage);

    const totalpage = Math.ceil(totalItems / itempage);

    res.render("allpack/photographers/photographers", {
      files,
      currentpage,
      totalpage,
      itempage,
      totalItems
    });

  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Server Error");
  }
};
exports.getdashbord = async (req, res) => {
  try {
    const itempage = 5;
    const currentpage = parseInt(req.query.page) || 1;

    const totalItems = await File.countDocuments();

    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip((currentpage - 1) * itempage)
      .limit(itempage);

    const totalpage = Math.ceil(totalItems / itempage);

    res.render("allpack/photographers/dashboadphpto", {
      files,
      currentpage,
      totalpage,
      itempage,
      totalItems
    });

  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Server Error");
  }
};

exports.addmedia = async(req, res)=>{
    res.render("allpack/photographers/add");
}
exports.editmedia = async(req, res)=>{
    try {
        const file = await File.findById(req.params.id)
        if(!file){
            return res.status(404).send("file not found")
        }
        res.render("allpack/photographers/edit",{file})
    } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Server Error"); 
    }
    
}
// update
exports.updatemedia = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).send("file not found");
    }

    file.title = req.body.title;
    file.description = req.body.description;

    if (req.file) {
      const oldPath = path.join(__dirname, "../all_disk/camera_images", file.filePath);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      file.filePath = req.file.filename;
      file.fileType = req.file.mimetype.startsWith("image") ? "image" : "video";
    }

    await file.save();

    // ALWAYS redirect
    return res.redirect("/dashboard/media");

  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).send("Server Error");
  }
};
// delete
exports.deletemedia = async(req,res)=>{
  try {
    const file = await File.findById(req.params.id);
    if(!file){
      return res.status(404).send("file not found")
    }
    const oldPath = path.join(__dirname,"../all_disk/camera_images", file.filePath);
    if(fs.existsSync(oldPath)){
      fs.unlinkSync(oldPath)
    }
    await File.findByIdAndDelete(req.params.id)
    res.redirect("/dashboard/media")
  } catch (error) {
    console.error("Media deleted successfully:", error);
    res.status(500).send("Server Error");
  }

}

      
