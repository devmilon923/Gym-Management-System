const express = require("express");
const {
  viewRequest,
  updateRequest,
} = require("../controllers/adminController");

const verifyAdmin = require("../middlewares/verifyAdmin");

const route = express.Router();
route.get("/view-request", verifyAdmin, viewRequest);
route.get("/update-request/:id", verifyAdmin, updateRequest);
module.exports = route;
