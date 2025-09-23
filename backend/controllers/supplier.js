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