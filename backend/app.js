const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/routers')
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(router);

const PORT = 8000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});