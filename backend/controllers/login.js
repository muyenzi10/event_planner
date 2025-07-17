const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signup = require("../models/admin");

exports.postlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate empty fields
    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/direct/myaccount/login");
    }
    // Find user and select password
    const user = await signup.findOne({ email }).select("+password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/direct/myaccount/login");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/direct/myaccount/login");
    }

    // Generate token (optional if using sessions instead)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Set session or cookie (optional if using sessions)
    // req.session.user = user;

    req.flash("success", "Logged in successfully");
    return res.redirect("/direct/myaccount/login"); // or wherever you want to redirect
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "An error occurred during login");
    return res.redirect("/direct/myaccount/login");
  }
};
