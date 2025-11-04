const mongoose = require("mongoose");

const DecorSchema = new mongoose.Schema({
    title: { type: String, required: true },         
    description: { type: String },                   
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Upload", DecorSchema);
