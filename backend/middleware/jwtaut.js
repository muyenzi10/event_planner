const jwt = require("jsonwebtoken");

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
