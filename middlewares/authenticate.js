const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { httpError } = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(httpError(401, "123"));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401, "234"));
  }
};

module.exports = authenticate;
