const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    passwordconfirm: {
        type: String,
        required: [true, "Please confirm password"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords do not match!"
        }
    }
});

adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordconfirm = undefined; // Don't store confirmation
    next();
});

module.exports = mongoose.model("admin", adminSchema);
