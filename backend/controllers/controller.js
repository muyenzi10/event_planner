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
    res.render('home_packages/suply');
    };       
exports.getbook = (req, res)=>{
        res.render('home_packages/booking');
            };

exports.getsuppliersformat = (req, res)=>{
    res.render('home_packages/suplyformat');
        };             
exports.signup = (req, res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/signup_login/signup.html"));
    };
exports.login = (req, res) => {
    res.render('signup_login/login', {
        error: req.flash('error'),
        success: req.flash('success')
        });
      };