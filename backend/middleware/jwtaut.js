// middleware/requireAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/admin"); // single model for admin + user

exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "Please log in first");
    return res.redirect("/direct/myaccount/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }

    // Load full user object from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      req.flash("error", "User no longer exists");
      return res.redirect("/direct/myaccount/login");
    }

    req.userDoc = user; // store full object for restrictTo
    next();
  } catch (err) {
    req.flash("error", "Session expired or invalid, please log in again");
    return res.redirect("/direct/myaccount/login");
  }
};
// middleware/restrictTo.js
// middleware/restrictTo.js

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const user = req.userDoc; // comes from requireAuth

    if (!user) {
      req.flash("error", "User no longer exists");
      return res.redirect("/direct/myaccount/login");
    }

    // 🔥 ADMIN FULL ACCESS LOGIC
    if (user.role === "admin") {
      return next();  // Admin can access everything
    }

    // Normal role check
    if (!roles.includes(user.role)) {
      req.flash("error", "Access denied");
      return res.redirect("/direct/myaccount/login");
    }

    next();
  };
};