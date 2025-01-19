const express = require("express");
const {
  viewRequest,
  updateRequest,
  viewOneRequest,
  addClasses,
} = require("../controllers/adminController");

const verifyAdmin = require("../middlewares/verifyAdmin");

const route = express.Router();
route.get("/view-request", verifyAdmin, viewRequest);
route.get("/update-request/:id", verifyAdmin, updateRequest);
route.get("/view-request/:id", verifyAdmin, viewOneRequest);
route.post("/add-classes", verifyAdmin, addClasses);
module.exports = route;
