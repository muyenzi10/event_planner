const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routers');

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Use the router
app.use(router);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error.html'));
});

// Error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});