const path = require('path');
exports.getdecor = (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/allpack/venues/venues.html"));
}
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
exports.getdecor = (req,res) =>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/venues/venues.html"));
    }
exports.gettroupe = (req,res) =>{
    res.sendFile(path.join(__dirname,"../../frontend/allpack/indinzi/troup/indinzi.html"));
    }         