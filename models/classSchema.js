const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    trainees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    maxBooking: {
      type: Number,
      require: true,
      enum: [10],
      default: 10,
    },
  },
  { timestamps: true }
);
const ClassDB = mongoose.model("classDB", classSchema);
