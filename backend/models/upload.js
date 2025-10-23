const mongoose = require("mongoose");

const DecorSchema = new mongoose.Schema({
    title: { type: String, required: true },         // "Elegant Ballroom"
    description: { type: String },                   // "Beautiful floral designs..."
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Upload", DecorSchema);
