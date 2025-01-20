const ClassDB = require("../models/classSchema");
const RoleRequestDB = require("../models/roleRequestSchema");
const Users = require("../models/users");

const viewRequest = async (req, res) => {
  try {
    const request = await RoleRequestDB.find({ status: "Pending" }).populate({
      path: "user",
      select: "name email role isVerifyed _id createdAt profile",
    });
    res.send(request || []);
  } catch (error) {
    res.send(error.message);
  }
};
const updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const action = req.body?.action?.trim();

  if (!["Accepted", "Rejected"].includes(action)) {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Invalid action",
    });
  }

  try {
    const request = await RoleRequestDB.findById(requestId).populate({
      path: "user",
      select: "name email role isVerifyed _id createdAt profile",
    });

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    const user = request.user;
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (action === "Accepted") {
      request.status = "Accepted";
      user.role = request.requestedRole;
      user.isVerifyed = true;

      // Save both user and request, then update other pending requests
      await Promise.all([user.save(), request.save()]);
      await RoleRequestDB.updateMany(
        { user: user._id, status: "Pending" },
        { status: "Rejected" }
      );
    } else if (action === "Rejected") {
      request.status = "Rejected";
      await request.save(); // No need to save the user here
    }

    res.send({
      success: true,
      message: "Request updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const viewOneRequest = async (req, res) => {
  const requestID = req.params.id;
  const request = await RoleRequestDB.findById(requestID).populate({
    path: "user",
    select: "name email role isVerifyed _id createdAt profile",
  });

  res.send(request || []);
};
const addClasses = async (req, res) => {
  const nameRegex = /^[a-zA-Z\s]{15,}$/;
  if (!req.body?.title?.trim())
    return res.status(400).send({
      success: false,
      message: "Title must be required",
    });
  if (!nameRegex.test(req.body?.title.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "title",
        message:
          "Title has at least 15 alphabetic characters and optional spaces",
      },
    });

  const iso8601Regex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/;
  if (!req.body?.trainer?.trim())
    return res.status(400).send({
      success: false,
      message: "Trainer id must be required",
    });
  if (!req.body?.startTime?.trim())
    return res.status(400).send({
      success: false,
      message: "Start Time must be required",
    });
  if (!iso8601Regex.test(req.body?.startTime?.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "startTime",
        message:
          "Make sure client's input matches the required format (YYYY-MM-DDTHH:mm:ss.sss±HH:MM)",
      },
    });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); // Set to the start of the day

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999); // Set to the end of the day

  const todayAddedClasses = await ClassDB.find({
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });
  if (todayAddedClasses.length >= 5)
    return res.status(400).send({
      success: false,
      message: "Max 5 classes create in singel day",
    });

  const user = await Users.findOne({
    _id: req.body?.trainer,
    role: "Trainer",
  });
  if (!user)
    return res.status(400).send({
      success: false,
      message: "Invalid trainer",
      errorDetails: "Make sure trainer matches role 'Trainer'",
    });

  let startTime = new Date(req.body?.startTime); // Current date and time
  let endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to var1
  const addClass = await ClassDB.create({
    title: req.body?.title?.trim(),
    startTime: startTime,
    endTime: endTime,
    trainer: req.body?.trainer?.trim(),
  });
  res.status(201).send({
    success: true,
    statusCode: 201,
    message: "Class added successfully",
    class: addClass,
  });
};
module.exports = { viewRequest, updateRequest, viewOneRequest, addClasses };
