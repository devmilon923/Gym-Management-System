const Users = require("../models/users");
const mongoose = require("mongoose");
const updateProfile = async (req, res) => {
  const { gender, number, age, location } = req.body;
  if (gender?.trim() && number?.trim() && age?.trim() && location?.trim()) {
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

module.exports = { updateProfile, profile };
