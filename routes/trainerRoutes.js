const express = require("express");
const getTrainerActiveClasses = require("../controllers/trainerController");
const verifyUser = require("../middlewares/verifyUser");

const route = express.Router();

route.get("/active-classes", verifyUser, getTrainerActiveClasses);

module.exports = route;
