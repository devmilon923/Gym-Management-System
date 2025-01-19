const BookingDB = require("../models/bookingSchema");
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
const bookClasses = async (req, res) => {
  const classID = req.params?.id;

  try {
    // Find the requested class by ID
    const classDB = await ClassDB.findById(classID);
    if (!classDB) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: "Class not found",
      });
    }

    const { startTime: requestedStartTime, endTime: requestedEndTime } =
      classDB;

    // Fetch current bookings for the user
    const userCurrentBooking = await BookingDB.find({
      trainee: req.userInfo._id,
    }).populate("classDB", "startTime endTime");

    // Check for time slot overlap
    const checkTimeSlot = userCurrentBooking.some((booking) => {
      const { startTime: existingStartTime, endTime: existingEndTime } =
        booking.classDB;

      return (
        new Date(existingStartTime) < new Date(requestedEndTime) &&
        new Date(requestedStartTime) < new Date(existingEndTime)
      );
    });

    if (checkTimeSlot) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: "Time overlapping",
      });
    }

    // Create a new booking if no overlap
    const booking = await BookingDB.create({
      classDB: classID,
      trainee: req.userInfo._id,
    });

    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "Class booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { activeClasses, bookClasses };
