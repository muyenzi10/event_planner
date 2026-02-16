const bookingdb = require("../models/mydb");

// CREATE
exports.postbook = async (req, res) => {
  try {
    const {
      brideName, groomName, email, phone,
      weddingDate, guestsNumber, weddingType,
      weddingLocation, weddingVision
    } = req.body;

    if (!brideName || !groomName || !email || !phone || !weddingDate ||
        !guestsNumber || !weddingType) {
      return res.status(400).json({
        message: "Please fill in all required fields."
      });
    }

    await bookingdb.create({
      brideName,
      groomName,
      email,
      phone,
      weddingDate,
      guestsNumber,
      weddingType,
      weddingLocation,
      weddingVision
    });

    res.status(201).json({
      message: "Thank you for your booking request! We'll contact you shortly to confirm details."
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "We encountered an error processing your request.",
      error: error.message
    });
  }
};


// READ ALL with Filters + Pagination
exports.getbookformat = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Build filter dynamically
    const filter = {};
    const searchTerm = req.query.name ? req.query.name.trim() : "";

    if (searchTerm) {
      const nameRegex = new RegExp(searchTerm, "i");
      filter.$or = [
        { firstname:nameRegex },
        { lastname:nameRegex },
        { email:nameRegex }
      ];
    }

    // Fetch bookings and total count in parallel
    const [bookings, totalBookings] = await Promise.all([
      bookingdb.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      bookingdb.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalBookings / limit);

    res.render("home_packages/bookingformat", {
      bookings,
      currentPage: page,
      totalPages,
      totalBookings,
      limit,
      query: { name: searchTerm } // pass only the search term to the view
    });
  } catch (err) {
    console.error(err);
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
    res.render("home_packages/edit", { booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// UPDATE by ID
exports.updatedata = async (req, res) => {
  try {
    const booking = await bookingdb.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.render("home_packages/edit", { booking });
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
      return res.status(404).send("Booking not found");
    }
    req.flash("success_msg", "Booking deleted successfully");
    res.redirect("/Dashboard/booking");
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send("Server Error");
  }
};
