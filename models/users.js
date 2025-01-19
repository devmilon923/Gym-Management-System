const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Trainer", "Trainee"],
      required: true,
      default: "Trainee",
    },
    profile: {
      gender: {
        type: String,
        default: null,
      },
      number: {
        type: Number,
        default: null,
      },
      age: {
        type: Number,
        default: null,
      },
      location: {
        type: String,
        default: null,
      },
      photo: {
        type: String,
        default: null,
      },
    },
    isVerifyed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
