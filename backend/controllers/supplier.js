const supplier = require("../models/supplier");
exports.postsupplier = async (req,res)=>{
    try{
        const suppliers = await supplier.create(req.body);
        
    }catch(error){
        res.status(500).json({Message: error.message});
    }
}