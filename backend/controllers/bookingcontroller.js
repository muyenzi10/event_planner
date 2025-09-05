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

// READ ALL with Pagination (for view rendering)
exports.getbookformat = async (req, res) => {
    try {
        // Default page = 1, default limit = 5
        let { page = 1, limit = 5 } = req.query;

        // Convert to numbers
        page = parseInt(page);
        limit = parseInt(limit);

        // Skip calculation
        const skip = (page - 1) * limit;

        // Fetch data
        const bookings = await bookingdb.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // newest first if you use timestamps

        // Count total docs for pagination UI
        const totalBookings = await bookingdb.countDocuments();
        const totalPages = Math.ceil(totalBookings / limit);

        res.render('home_packages/bookingformat', {
            bookings,
            currentPage: page,
            totalPages,
            totalBookings
        });
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
        res.render('home_packages/edit', { booking });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// UPDATE by ID
exports.updatedata = async (req, res) => {
    try {
        const booking = await bookingdb.findByIdAndUpdate(req.params.id, req.body);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        res.render('home_packages/edit', { booking });
        
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