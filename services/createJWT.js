const jwt = require("jsonwebtoken");

const createJWT = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.jwtKey);
    return token;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
module.exports = createJWT;
