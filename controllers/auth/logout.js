const { User } = require("../../models");
require("dotenv").config();

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success, 204 No Content" });
};

module.exports = logout;
