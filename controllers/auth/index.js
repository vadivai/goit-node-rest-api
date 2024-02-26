const register = require("./register");
const getCurrent = require("./getCurrent");
const { login, logout } = require("./login, logout"); // в одном файле, потому что переменная token и там и там
const updateAvatar = require("./updateAvatar");
const { controllerWrapper } = require("../../helpers");

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateAvatar: controllerWrapper(updateAvatar),
};
