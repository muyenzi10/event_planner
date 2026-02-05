const supplier = require("../models/supplier");
exports.postsupplier = async (req, res) => {
  try {
    await supplier.create(req.body);

    // Success case
    res.render("home_packages/errorofsupplier/suppliermessage", {
      title: "Application Submitted",
      message: "Thank you for applying! Your supplier application has been received successfully.",
      subMessage:
        "Our team will review your application within 2–3 business days and contact you via email or phone.",
      nextSteps:
        "If you have any questions, feel free to reach out to contact",
      error: false // ✅ add this
    });

  } catch (err) {
    // Error case
    res.render("home_packages/errorofsupplier/suppliermessage", {
      title: "Submission Failed",
      message: "Something went wrong while submitting your application.",
      error: true, // ✅ add this
      errorMessage: err.message, // optional to display error details
      subMessage: null,
      nextSteps: null
    });
  }
};


exports.getsuppliers = async(req,res)=>{
    try{
     let page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 5;
     const skip = (page -1) * limit;
     const filter ={};
     const searchInput = req.query.name?.trim();
     if(searchInput){
      const regex = new RegExp(searchInput,"i");
      filter.$or= [
        {firstname:regex},
        {lastname:regex},
        {email:regex}
      ];
     };

    const suppliers = await supplier.find(filter).skip(skip).limit(limit);
    const totalSuppliers = await supplier.countDocuments(filter);
    const totalpage = Math.ceil(totalSuppliers / limit);
    res.render("home_packages/suplyformat", {suppliers,
      currentpage:page,
      totalpage,
      totalSuppliers,
      limit,
      query: req.query 
    });
}catch(err){
  res.status(500).json({message:err.message});
}
}
// read suppliers
exports.readsuppliers = async(req, res)=>{
    try{
    const readsup = await supplier.findById(req.params.id)
    if(!readsup){
        res.status(404).json("not found supplier");
    }
    res.render("home_packages/suppliers_edit", {readsup});
 }catch(err){
    res.status(500).json({message:err.message});
 }
}
exports.updateSuppliers = async (req, res) => {
  try {
    const updated = await supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    // redirect to the suppliers list or details page
    res.redirect("/Dashboard/view/suppliers");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSuppliers = async (req, res) => {
  try {
    await supplier.findByIdAndDelete(req.params.id);
    res.redirect("/Dashboard/view/suppliers");   // route that lists suppliers
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
