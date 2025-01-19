const express = require("express");
const verifyUser = require("../middlewares/verifyUser");
const {
  profile,
  updateProfile,
  traineeRequest,
} = require("../controllers/traineeController");

const route = express.Router();
route.get("/profile", verifyUser, profile);
route.post("/update-profile", verifyUser, updateProfile);
route.post("/trainee-request", verifyUser, traineeRequest);
module.exports = route;
