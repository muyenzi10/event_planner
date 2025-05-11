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
// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
require('dotenv').config({ path: "./config.env" });
app.use(bodyParser.urlencoded({ extended: false }));
// Use the router
app.use(router);
app.use(decorouter);
app.use(bookingdbrpouter);
app.use(supplierdb);
app.use(routersautor);
app.use(login);

// 404 handler
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error.html'));
});
app.use((req, res, next)=>{
    console.log(req.headers);
    next();

});
// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Connect to MongoDB and then start server
mongoose.connect("mongodb://127.0.0.1:27017/wedding_planner?directConnection=true")
.then(() => {
    console.log("MongoDB connected");
    const PORT = 7000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
});
