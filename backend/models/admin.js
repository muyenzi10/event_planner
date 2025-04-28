const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password"],
        minlength: 8
    },
    passconfirm: {
        type: String,
        required: [true, "Please confirm password"]
    }
});

module.exports = mongoose.model("admin", adminSchema);
