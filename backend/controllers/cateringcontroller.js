exports.getcatering = async(req,res)=>{
    res.render("allpack/catering/catering")
}
exports.getdash= async(req,res)=>{
    res.render("allpack/catering/cateringdashboad")
}
exports.getedit= async(req,res)=>{
   res.render("allpack/catering/edit") 
}
exports.getadd= async(req,res)=>{
   res.render("allpack/catering/add") 
}