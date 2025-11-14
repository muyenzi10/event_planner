const express = require("express");
const contactrouter = express.Router();
const contact = require("../controllers/contact")
contactrouter.get("/contact", contact.getcontact)
contactrouter.post("/contact", contact.postcontact)
module.exports = contactrouter;