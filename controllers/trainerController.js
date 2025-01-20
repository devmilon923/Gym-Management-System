const ClassDB = require("../models/classSchema");

const getTrainerActiveClasses = async (req, res) => {
  if (req.userInfo.role === "Trainer") {
    try {
      const classes = await ClassDB.find({
        trainer: req.userInfo._id,
      });
      res.send(classes || []);
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Unauthorized access",
      errorDetails:
        "You don't have any permisson to access this route if you think your are trainer please logout and login again to make sure you have active access token",
    });
  }
};

module.exports = getTrainerActiveClasses;
