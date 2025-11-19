const path = require('path');

exports.getinvitation = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/allpack/invitation/inve.html"));
}
exports.getstyle = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/allpack/st/st.html"));
}
exports.getbeauty = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/allpack/makeup/beaty.html"));
}
exports.getmc = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/allpack/mc/mc.html"));
}

exports.getgakondo = (req,res) =>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/iganze/gakondo.html"));
    }       
exports.getsound = (req,res) =>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/sound/sound.html"));
    }    
exports.getcatering= (req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/catering/catering.html"));
  }
exports.getservice= (req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/iriza/iriza.html"));
}      