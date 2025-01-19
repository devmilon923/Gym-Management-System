const express = require("express");
const {
  activeClasses,
  bookClasses,
} = require("../controllers/traineeController");
const verifyUser = require("../middlewares/verifyUser");
const route = express.Router();
route.get("/active-classes", verifyUser, activeClasses);
route.post("/book-classes/:id", verifyUser, bookClasses);
module.exports = route;
