const express = require('express');
const packages = require("../controllers/packages");
const routerpack = express.Router();

routerpack.get("/invitation", packages.getinvitation);
routerpack.get("/dresses", packages.getstyle);
routerpack.get("/beauty", packages.getbeauty);
routerpack.get("/mc", packages.getmc);
routerpack.get("/gakondo", packages.getgakondo);
routerpack.get("/sound", packages.getsound);
module.exports = routerpack;