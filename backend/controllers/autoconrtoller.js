const jwt = require("jsonwebtoken");
const signup = require("../models/admin");

exports.postsignup = async (req, res) => {
  try {
    const userad = await signup.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign(
      { id: userad._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        _id: userad._id,
        firstName: userad.firstName,
        lastName: userad.lastName,
        email: userad.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
      error: error.message,
    });
  }
};
