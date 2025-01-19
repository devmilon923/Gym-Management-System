const bcrypt = require("bcrypt");

const checkHashPassword = async (password, dbPassword) => {
  try {
    const hash = bcrypt.compare(password, dbPassword);
    return hash;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
module.exports = checkHashPassword;
