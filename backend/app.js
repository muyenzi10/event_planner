const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routers');
const decorouter = require("./routers/packagerouter");
const mongoose = require('mongoose');
const booking = require('./models/mydb');
const bookingdbrpouter = require("./routers/bookingrouter");

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
// Use the router
app.use(router);
app.use(decorouter);
app.use(bookingdbrpouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error.html'));
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Connect to MongoDB and then start server
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0")
.then(() => {
    console.log("MongoDB connected");
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
});
