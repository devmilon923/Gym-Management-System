const express = require("express");
const {
  updateProfile,
  traineeRequest,
  profile,
  trainerRequest,
  activeClasses,
} = require("../controllers/accountController");
const verifyUser = require("../middlewares/verifyUser");
const checkProfile = require("../middlewares/checkProfile");

const route = express.Router();
route.get("/profile", verifyUser, profile);
route.post("/update-profile", verifyUser, updateProfile);
route.post("/trainee-request", verifyUser, checkProfile, traineeRequest);
route.post("/trainer-request", verifyUser, checkProfile, trainerRequest);

module.exports = route;
