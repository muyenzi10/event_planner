const path = require('path');
exports.getabout = (req, res) => {
  res.render('home_packages/about', { activePage: 'about' });
};
exports.getsupply = (req, res) => {
  res.render('home_packages/suply', { activePage: 'suppliers' });
};

exports.getbook = (req, res) => {
  res.render('home_packages/booking', { activePage: 'booking' });
};

exports.getsignup = (req,res)=>{                
res.render('signup_login/signup', {
            error: req.flash('error'),
            success: req.flash('success')
          });
        };
exports.login = (req, res) => {
    res.render('signup_login/login', {
        error: req.flash('error'),
        success: req.flash('success')
        });
      };