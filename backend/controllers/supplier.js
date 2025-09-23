const supplier = require("../models/supplier");
exports.postsupplier = async (req,res)=>{
    try{
        const newsuppliers = await supplier.create(req.body);
        res.status(200).json({message:"Supplier created successfully", data:newsuppliers});
        
    }catch(error){
        res.status(500).json({Message: error.message});
    }
}
exports.getsuppliers = async(req,res)=>{
    try{
    const suppliers = await supplier.find();
    res.render("home_packages/suplyformat", {suppliers});
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
