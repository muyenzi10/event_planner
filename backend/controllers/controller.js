const path = require('path');
exports.gethome = (req, res)=>{
res.sendFile(path.join(__dirname,"../../frontend/home_packages/home.html"));
};
exports.getabout = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/home_packages/about.html"));
    };
exports.getpack = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/home_packages/index.html"));
    };
    exports.getsupply = (req, res)=>{
        res.sendFile(path.join(__dirname,"../../frontend/home_packages/suply.html"));
        };     
exports.getbook = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/home_packages/booking.html"));
        };
exports.signup = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/signup_login/signup.html"));
    };
exports.login = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/signup_login/login.html"));
    };      