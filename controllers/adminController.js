const RoleRequestDB = require("../models/roleRequestSchema");

const viewRequest = async (req, res) => {
  try {
    const request = await RoleRequestDB.find({ status: "Pending" }).populate({
      path: "user",
      select: "name email role isVerifyed _id createdAt profile",
    });
    res.send(request || []);
  } catch (error) {
    res.send(error.message);
  }
};
const updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const action = req.body?.action?.trim();

  if (!["Accepted", "Rejected"].includes(action)) {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Invalid action",
    });
  }

  try {
    const request = await RoleRequestDB.findById(requestId).populate({
      path: "user",
      select: "name email role isVerifyed _id createdAt profile",
    });

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    const user = request.user;
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (action === "Accepted") {
      request.status = "Accepted";
      user.role = request.requestedRole;
      user.isVerifyed = true;

      // Save both user and request, then update other pending requests
      await Promise.all([user.save(), request.save()]);
      await RoleRequestDB.updateMany(
        { user: user._id, status: "Pending" },
        { status: "Rejected" }
      );
    } else if (action === "Rejected") {
      request.status = "Rejected";
      await request.save(); // No need to save the user here
    }

    res.send({
      success: true,
      message: "Request updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const viewOneRequest = async (req, res) => {
  const requestID = req.params.id;
  const request = await RoleRequestDB.findById(requestID).populate({
    path: "user",
    select: "name email role isVerifyed _id createdAt profile",
  });
  res.send(request || []);
};

module.exports = { viewRequest, updateRequest, viewOneRequest };
