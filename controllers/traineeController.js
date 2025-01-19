const updateProfile = async (req, res) => {
  res.send(req.body);
};
const profile = async (req, res) => {
  res.send(req.userInfo);
};

module.exports = { updateProfile, profile };
