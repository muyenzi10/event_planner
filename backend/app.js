require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routers');
const cookieParser = require("cookie-parser");
const decorouter = require("./routers/packagerouter");
const bookingformat = require("./routers/bookingformat");
const mongoose = require('mongoose');
// ejs
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("express-flash");
const bookingdbrpouter = require("./routers/bookingrouter");
const supplierdb = require("./routers/supplierrouter");
const routersautor = require("./routers/signuprouter");
const login = require("./routers/login");
const bodyParser = require('body-parser');
// Middleware setup
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
//app.use('/static', express.static(path.join(__dirname, '../frontend/home_packages/public')));
app.use(express.static('home_packages/public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
  }));
app.use(flash());
// view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));
//app.set('layout', 'home_packages/booking');
//app.use(expressLayout);

// Routes
app.use(router);
app.use(decorouter);
app.use(supplierdb);
app.use(routersautor);
app.use(login);
app.use(bookingdbrpouter);
app.use(bookingformat);
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