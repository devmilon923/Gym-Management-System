const jwt = require("jsonwebtoken");

const checkJWT = async (token) => {
  if (!token)
    return res.status(401).res.send({
      success: false,
      statusCode: 401,
      message: "Missing authorization token",
    });

  try {
    const decode = jwt.verify(token, process.env.jwtKey);
    return decode;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
module.exports = checkJWT;
