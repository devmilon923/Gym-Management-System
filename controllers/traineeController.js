const RoleRequestDB = require("../models/roleRequestSchema");
const Users = require("../models/users");
const mongoose = require("mongoose");
const updateProfile = async (req, res) => {
  const { gender, number, age, location, photoUrl } = req.body;
  if (
    gender?.trim() &&
    number?.trim() &&
    age?.trim() &&
    location?.trim() &&
    photoUrl?.trim()
  ) {
    try {
      const user = await Users.findById(req.userInfo._id);
      if (!user)
        return res.send({
          success: false,
          statusCode: 400,
          message: "User not found",
        });

      user.profile.gender = gender;
      user.profile.number = parseInt(number);
      user.profile.age = parseInt(age);
      user.profile.location = location;
      user.profile.photo = photoUrl;
      await user.save();
      return res.send({
        success: true,
        statusCode: 200,
        message: "Profile success to update",
      });
    } catch (error) {
      console.log(error.message);
      return res.send({
        success: false,
        statusCode: 400,
        message: error.message,
      });
    }
  } else {
    return res.send({
      success: false,
      statusCode: 400,
      message: "All feild are required",
    });
  }
};
const profile = async (req, res) => {
  try {
    const user = await Users.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.userInfo._id),
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          profile: 1,
          role: 1,
          createAt: 1,
        },
      },
    ]);

    res.send(user[0] || {});
  } catch (error) {
    console.log("error");
    res.send(error);
  }
};
const traineeRequest = async (req, res) => {
  const noteRegex = /^[a-zA-Z\s]{15,}$/;

  if (!req.body?.note?.trim())
    return res.status(400).send({
      success: false,
      message: "Note must be required",
    });
  if (!noteRegex.test(req.body?.note?.trim()))
    return res.status(400).send({
      success: false,
      message: "Validation error occurred",
      errorDetails: {
        field: "note",
        message:
          "Note has at least 15 alphabetic characters and optional spaces",
      },
    });
  if (req.userInfo?.isVerifyed && req.userInfo?.role === "Trainee")
    return res.send({
      success: false,
      statusCode: 400,
      message: `You already be a verifyed Trainee`,
    });
  const checkRequst = await RoleRequestDB.findOne({
    user: req.userInfo._id,
    requestedRole: "Trainee",
    status: "Pending",
  });
  if (checkRequst)
    return res.send({
      success: false,
      statusCode: 400,
      message: `You already submitted a trainee request`,
      errorDetails:
        "Before your current request Rejected or Accepted you can't make another request",
    });
  await RoleRequestDB.create({
    user: req.userInfo._id,
    note: req.body?.note?.trim(),
    requestedRole: "Trainee",
  });
  return res.send({
    success: true,
    statusCode: 201,
    message: `Trainee request submitted`,
  });
};
module.exports = { updateProfile, profile, traineeRequest };
