const express = require("express");
const {
  activeClasses,
  bookClasses,
  cancelBooking,
} = require("../controllers/traineeController");
const verifyUser = require("../middlewares/verifyUser");
const checkProfile = require("../middlewares/checkProfile");
const route = express.Router();
route.get("/active-classes", verifyUser, activeClasses);
route.get("/book-classes/:id", verifyUser, checkProfile, bookClasses);
route.get("/cancel-booking/:id", verifyUser, checkProfile, cancelBooking);
module.exports = route;
