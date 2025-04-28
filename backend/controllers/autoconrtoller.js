const signup= require("../models/admin");
exports.postsignup= async (req, res)=>{
    try{
        const userad = await signup.create(req.body); 
    res.status(200).json({message:"it's work", data:{
        user:userad
    }});
}catch(error){
    res.status(500).json({Message:error.message});
}
}