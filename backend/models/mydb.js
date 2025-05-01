const mongoose = require('mongoose');
const booking = mongoose.Schema({
  couple: {
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
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    }
  },
  wedding: {
    date: {
      type: Date,
      required: [true, 'Date is required']
    }
  },
  guest: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Must have at least 1 guest']
  },
  location: {
    type: String,
    trim: true
  }
});

const Bookings = mongoose.model('bookings', booking);
module.exports = Bookings;
