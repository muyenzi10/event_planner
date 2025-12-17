const mongoose = require("mongoose");

const cateringSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String, // e.g. 'image' or 'video'
    enum: ['image', 'video'],
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model("catering", cateringSchema);
