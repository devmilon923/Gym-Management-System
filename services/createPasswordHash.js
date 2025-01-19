const bcrypt = require("bcrypt");

const createHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
module.exports = createHash;
