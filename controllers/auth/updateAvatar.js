const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  //   console.log("req.user", req.user);
  //   console.log("req.file", req.file);

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json(avatarURL);
};

module.exports = updateAvatar;