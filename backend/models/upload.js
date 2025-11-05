const mongoose = require("mongoose");

const DecorSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String,
  fileType: String,
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true }); // adds createdAt and updatedAt automatically


module.exports = mongoose.model("Upload", DecorSchema);
