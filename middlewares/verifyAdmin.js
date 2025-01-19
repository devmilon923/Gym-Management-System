const checkJWT = require("../services/checkJWT");

const verifyAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken)
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Missing authorization token",
    });
  try {
    const decodedData = await checkJWT(authToken);
    if (decodedData?.role !== "Admin")
      return res.status(401).send({
        success: false,
        statusCode: 401,
        message: "Unauthorized access",
        errorDetails: "You don't have any permisson to access this route",
      });
    const { token, createdAt, ...data } = decodedData;
    req.userInfo = data;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "Unauthorized access",
      errorDetails: "You don't have any permisson to access this route",
    });
  }
};
module.exports = verifyAdmin;
