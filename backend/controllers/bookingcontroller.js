const bookingdb = require("../models/mydb");

// CREATE
exports.postbook = async (req, res) => {
    try {
        const {
            firstname, lastname, email, phone,
            weddingDate, guestsNumber, weddingType,
            weddingLocation, weddingVision
        } = req.body;

        if (!firstname || !lastname || !email || !phone || !weddingDate || !guestsNumber || !weddingType || !weddingLocation || !weddingVision) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const booking = await bookingdb.create(req.body);
        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
};

// READ ALL (for view rendering)
exports.getbookformat = async (req, res) => {
    try {
        const bookings = await bookingdb.find();
        res.render('home_packages/bookingformat', { bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).send("Server Error");
    }
};

// READ ONE by ID
exports.readdata = async (req, res) => {
    try {
        const booking = await bookingdb.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// UPDATE by ID
exports.updatedata = async (req, res) => {
    try {
        const booking = await bookingdb.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// DELETE by ID
exports.deletedata = async (req, res) => {
    try {
        const booking = await bookingdb.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
