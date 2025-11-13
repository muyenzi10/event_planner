const express = require('express');
const packages = require("../controllers/packages");
const routerpack = express.Router();

routerpack.get("/invetation", packages.getinvitation);
routerpack.get("/styles", packages.getstyle);
routerpack.get("/beauty", packages.getbeauty);
routerpack.get("/mc", packages.getmc);
routerpack.get("/gakondo", packages.getgakondo);
routerpack.get("/sound", packages.getsound);
routerpack.get("/photographers", packages.getphotographers);
routerpack.get("/catering", packages.getcatering);
routerpack.get("/service", packages.getservice);


module.exports = routerpack;