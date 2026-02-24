const jwt = require("jsonwebtoken");
const signup = require("../models/admin")
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "Please log in first");
    return res.redirect("/direct/myaccount/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.flash("error", "Session expired or invalid, please log in again");
    return res.redirect("/direct/myaccount/login");
  }
};
exports.restrictTo = (...roles) => {
  return async (req, res, next) => {

    const user = await signup.findById(req.user.id);

    if (!user) {
      req.flash("error", "User no longer exists");
      return res.redirect("/direct/myaccount/login");
    }

    if (!roles.includes(user.role)) {
      req.flash("error", "Access denied");
      return res.redirect("/direct/myaccount/login");
    }

    next();
  };
};
