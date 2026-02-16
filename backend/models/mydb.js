const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    brideName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    groomName: {
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
    },
    weddingDate: {
        type: Date,
        required: [true, 'Wedding date is required']
    },
    guestsNumber: {
        type: Number,
        required: [true, 'Number of guests is required'],
        min: [1, 'Must have at least 1 guest']
    },
    weddingType: {
        type: String,
        trim: true,
        enum: ['Gusaba no Gukwa', 'Reception', 'Other'],
        required: [true, 'Wedding style is required']
    },
    weddingLocation: {
        type: String,
        trim: true
    },
    weddingVision: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;