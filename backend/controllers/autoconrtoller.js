const jwt = require("jsonwebtoken");
const signup = require("../models/admin");

exports.postsignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      req.flash("error", "All fields are required");
      return res.redirect("/direct/api/signup");
    }

    if (password !== passwordConfirm) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/direct/api/signup");
    }

    // Create user
    const userad = await signup.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    });

    // Optional: generate JWT
    const token = jwt.sign(
      { id: userad._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    req.flash("success", "Account created successfully");
    return res.redirect("/direct/api/signup");
  } catch (error) {
    // Handle duplicate email or other Mongoose errors
    if (error.code === 11000) {
      req.flash("error", "Email already exists");
    } else {
      req.flash("error", "Signup failed: " + error.message);
    }
    return res.redirect("/direct/api/signup");
  }
};
