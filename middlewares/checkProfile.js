const Users = require("../models/users");

const checkProfile = async (req, res, next) => {
  const user = await Users.findById(req.userInfo._id);
  if (!user)
    return res.send({
      success: false,
      statusCode: 400,
      message: "User not found",
    });
  if (
    user?.profile?.age &&
    user?.profile?.gender &&
    user?.profile?.number &&
    user?.profile?.location &&
    user?.profile?.photo
  ) {
    next();
  } else {
    return res.send({
      success: false,
      statusCode: 400,
      message: "This profile are not eligible",
      errorDetails:
        "Please make sure your profile is update following all infomation",
    });
  }
};
module.exports = checkProfile;
