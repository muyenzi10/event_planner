const jwt = require("jsonwebtoken");
const signup = require("../models/admin");
exports.postsignup = async (req, res) => {
    try {
        const userad = await signup.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordconfirm: req.body.passwordconfirm
        });
const token = jwt.sign({id: userad._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN});        

        // Send success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,user: {
                _id: userad._id,
                name: userad.name,
                email: userad.email,
                password: userad.password,
                passwordconfirm: userad.passwordconfirm

            }
        });

    } catch (error) {
        // Send error response
        res.status(500).json({
            success: false,
            message: "User creation failed",
            error: error.message
        });
    }
};
