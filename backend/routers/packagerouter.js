const express = require('express');
const packages = require("../controllers/packages");
const routerpack = express.Router();

routerpack.get("/decor", packages.getdecor);
routerpack.get("/invetation", packages.getinvitation);
routerpack.get("/styles", packages.getstyle);
routerpack.get("/beauty", packages.getbeauty);
routerpack.get("/troupe", packages.gettroupe);
routerpack.get("/mc", packages.getmc);

module.exports = routerpack;