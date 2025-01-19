const ClassDB = require("../models/classSchema");

const activeClasses = async (req, res) => {
  if (req.userInfo?.role !== "Trainee")
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Unauthorized access",
      errorDetails:
        "You don't have any permisson to access this route only trainee can see active classess",
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
  })
    .populate({
      path: "trainer",
      select:
        "-password -role -isVerifyed -updatedAt -__v -_id -profile.number",
    })
    .select("-trainees -__v -updatedAt");
  console.log(todayAddedClasses.length);

  res.send(todayAddedClasses);
};

module.exports = { activeClasses };
