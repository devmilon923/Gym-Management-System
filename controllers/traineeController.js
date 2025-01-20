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

    // Check if the class is already full
    if (classDB.trainees.length >= 10) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: "Class is already full. No more bookings are allowed.",
      });
    }

    // Check if the user is already enrolled in this class
    if (classDB.trainees.includes(req.userInfo._id)) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: "You are already enrolled in this class.",
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

    // Add trainee to the class trainees array
    classDB.trainees.push(req.userInfo._id);
    await classDB.save();

    // Create a new booking
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
      errorDetails: error.message,
    });
  }
};
const cancelBooking = async (req, res) => {
  const bookingID = req.params?.id;

  try {
    // Find the booking by ID
    const booking = await BookingDB.findById(bookingID);
    if (!booking) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: "Booking not found",
      });
    }

    // Find the class associated with the booking
    const classDB = await ClassDB.findById(booking.classDB);
    if (!classDB) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: "Class not found for this booking",
      });
    }

    // Remove the trainee from the classDB's trainees array
    classDB.trainees = classDB.trainees.filter(
      (traineeId) => traineeId.toString() !== req.userInfo._id.toString()
    );
    await classDB.save();

    // Update the booking status to false (canceled)
    booking.status = false;
    await booking.save();

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: "Booking canceled successfully",
      Data: booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Server error",
      errorDetails: error.message,
    });
  }
};
module.exports = { activeClasses, bookClasses, cancelBooking };
