require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
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
const decorupload =require("./routers/decorouter");
const indinzi = require("./routers/troup");
const photographers = require("./routers/photographyrouter");
const cateringrouters = require("./routers/catereing")
const contact = require("./routers/contactrouter")
const bodyParser = require('body-parser');
// Middleware setup
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());
app.use(methodOverride('_method'));
//app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.urlencoded({extends:true}));
//app.use('/static', express.static(path.join(__dirname, '../frontend/home_packages/public')));
app.use(express.static('home_packages/public'));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
  }));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});
// view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));
//app.set('layout', 'home_packages/booking');
//app.use(expressLayout);

// 🟢 Make uploaded troupe images accessible
app.use("/all_disk/decor_images", express.static(path.join(__dirname, "all_disk/decor_images")));
app.use("/all_disk/troupe_images", express.static(path.join(__dirname, "all_disk/troupe_images")));
app.use("/all_disk/camera_images", express.static(path.join(__dirname, "all_disk/camera_images")));
// Routes
app.use(router);
app.use(decorouter);
app.use(supplierdb);
app.use(contact);
app.use(routersautor);
app.use(login);
app.use(bookingdbrpouter);
app.use(bookingformat);
app.use(decorupload);
app.use(indinzi);
app.use(photographers);
app.use(cateringrouters);
// Error handling middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error.html'));
});


// make flash available to all EJS pages

// Database connection and server start
mongoose.connect("mongodb://127.0.0.1:27017/wedding_planner?directConnection=true")
    .then(() => {
        console.log("MongoDB connected successfully");
        const PORT = process.env.PORT || 7000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });