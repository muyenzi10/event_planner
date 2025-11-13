const express = require("express");
const contactrouter = express.Router();
const contact = require("../controllers/contact")
contactrouter.get("/contact", contact.getcontact)
module.exports = contactrouter;