const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  business: {
    type: String,
    required: false,
    trim: true
  },
  location: {
    type: String,
    required: [true, "Business location is required"],
    trim: true
  },
  service: {
    type: String,
    required: [true, "Service category is required"],
    trim: true,
    enum: [
      'Catering',
      'Videography & Photography',
      'Venue',
      'Florists',
      'Troupe',
      'Decor',
      'Transportation (Cars)',
      'Invitation Cards',
      'Beauty & Makeup',
      'Bridal Style & Attire',
      'Master of Ceremonies (MC)',
      'Sound & Lighting',
      'Gakondo',
      'Amahamba',
      'Other Wedding Services'
    ]
  },
  experience: {
    type: Number
  },
  link: {
    type: String,
    trim: true
  },
  response: {
    text: String,
    respondedAt: Date
  }
});
module.exports = mongoose.model("Supplier", SupplierSchema);
