const File = require("../models/service");
const path = require("path");
const fs = require("fs");
exports.postservice = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const Newimagesservice = new File({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.filename,
            fileType: req.file.mimetype.startsWith("image") ? "image" : "video"
        });

        await Newimagesservice.save();
        res.redirect("/dashboard/services");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
};
exports.getservice = async (req, res)=>{
    try {
           const itemsPerPage = 24; // number of items per page
           const currentPage = parseInt(req.query.page) || 1; // current page from query, default 1
       
           // total number of documents
           const totalItems = await File.countDocuments();
       
           // fetch paginated documents
           const files = await File.find()
              // make sure your schema has timestamps
             .sort({uploadedAt : -1 })
             .skip((currentPage - 1) * itemsPerPage)
             .limit(itemsPerPage);
       
           const totalPages = Math.ceil(totalItems / itemsPerPage);
       
           res.render("allpack/iriza/iriza", {
            activePage: 'packages', 
            files,
             currentPage,
             totalPages,
              itemsPerPage,
              totalItems
           });
         } catch (error) {
           console.error(error);
           res.status(404).send("Not found files");
         }
}
exports.getadd = (req, res)=>{
    res.render("allpack/iriza/add")
}
exports.getedit = async(req, res)=>{
     try {
        const file = await File.findById(req.params.id); // ✅ 'params' not 'paramas'
    
        if (!file) {
          return res.status(404).send("File not found");
        }
    
        res.render("allpack/iriza/edit", { file });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    };
exports.getdashboard = async(req, res)=>{
     try {
            const itemsPerPage = 5; // number of items per page
            const currentPage = parseInt(req.query.page) || 1; // current page from query, default 1
        
            // total number of documents
            const totalItems = await File.countDocuments();
        
            // fetch paginated documents
            const files = await File.find()
               // make sure your schema has timestamps
              .sort({uploadedAt : -1 })
              .skip((currentPage - 1) * itemsPerPage)
              .limit(itemsPerPage);
        
            const totalPages = Math.ceil(totalItems / itemsPerPage);
        
            res.render("allpack/iriza/dashboard", {
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
exports.updateservice = async(req,res)=>{
    try {
        const file = await File.findById(req.params.id);
        if(!file){
            return res.status(404).send("not found file")
        }
        file.title = req.body.title;
        file.description = req.body.description;
        // delete old file
        if(req.file){
        const oldpath = path.join(__dirname,"../all_disk/service", file.filePath);
        if(fs.existsSync(oldpath)){
            fs.unlinkSync(oldpath);
        }
        file.filePath = req.file.filename;
        file.fileType = req.file.mimetype.startsWith("image")? "image" : "video"
       
    }
    await file.save();
    res.redirect("/dashboard/services") 
}catch (error) {
        console.error(error);
        res.status(500).send("server not found")
    }
}
exports.deleteservice = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }

    // Delete file from disk
    const oldpath = path.join(__dirname, "../all_disk/service", file.filePath);
    if (fs.existsSync(oldpath)) {
      fs.unlinkSync(oldpath);
    }

    // Delete from DB
    await File.findByIdAndDelete(req.params.id);

    res.redirect("/dashboard/services");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};