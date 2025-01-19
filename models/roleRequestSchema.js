const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    requestedRole: {
      type: String,
      required: true,
      enum: ["Trainer", "Trainee"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const RoleRequestDB = mongoose.model("roleRequestDB", requestSchema);
module.exports = RoleRequestDB;
