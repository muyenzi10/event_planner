const bookingdb = require("../models/mydb");

exports.postbook = async (req, res) => {
    try {
       
        
        // Validate required fields
        if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.phone || 
            !req.body.weddingDate || !req.body.guestsNumber || !req.body.weddingType) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const booking = await bookingdb.create(req.body);

        console.log('Booking created:', booking);
        res.status(201).json({
            message: "Booking created successfully",
            booking: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ 
            message: "Error creating booking",
            error: error.message 
        });
    }
};