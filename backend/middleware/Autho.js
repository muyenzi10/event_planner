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