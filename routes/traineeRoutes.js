const express = require("express");
const { activeClasses } = require("../controllers/traineeController");
const verifyUser = require("../middlewares/verifyUser");
const route = express.Router();
route.get("/active-classes", verifyUser, activeClasses);
module.exports = route;
