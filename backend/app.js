require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routers');
const decorouter = require("./routers/packagerouter");
const mongoose = require('mongoose');
const bookingdbrpouter = require("./routers/bookingrouter");
const supplierdb = require("./routers/supplierrouter");
const routersautor = require("./routers/signuprouter");
const login = require("./routers/login");
const bodyParser = require('body-parser');

// Middleware setup
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use(router);
app.use(decorouter);
app.use(bookingdbrpouter);
app.use(supplierdb);
app.use(routersautor);
app.use(login);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Database connection and server start
mongoose.connect("mongodb://127.0.0.1:27017/wedding_planner?directConnection=true")
    .then(() => {
        console.log("MongoDB connected successfully");
        const PORT = process.env.PORT || 7000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });