const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signup = require("../models/admin");

exports.postlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input fields
    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/direct/myaccount/login");
    }

    // 2. Find user by email and select password explicitly
    const user = await signup.findOne({ email }).select("+password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/direct/myaccount/login");
    }

    // 3. Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/direct/myaccount/login");
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Set JWT token as HTTP-only cookie (secure recommended for production)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
      // secure: true, // uncomment if using HTTPS
      // sameSite: "strict" // adjust based on your needs
    });

    // 6. Successful login flash message and redirect
    req.flash("success", "Logged in successfully");
    return res.redirect("/Dashboard/booking");

  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "An error occurred during login");
    return res.redirect("/direct/myaccount/login");
  }
};
