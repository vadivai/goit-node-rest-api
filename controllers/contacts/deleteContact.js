const HttpError = require("../../helpers");
const {Contact} = require("../../models");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = deleteContact;
