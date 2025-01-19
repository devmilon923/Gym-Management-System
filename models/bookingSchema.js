const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    classDB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classDB",
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const BookingDB = mongoose.model("bookingDB", bookingSchema);
module.exports = BookingDB;
