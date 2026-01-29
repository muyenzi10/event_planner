const express = require("express");
const routerpack = express.Router();
const pack = require("../controllers/pack");
routerpack.get("/packages", pack.getpackages);
module.exports = routerpack;