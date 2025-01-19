const express = require("express");
const verifyUser = require("../middlewares/verifyUser");
const { profile } = require("../controllers/traineeController");

const route = express.Router();
route.get("/profile", verifyUser, profile);
module.exports = route;
