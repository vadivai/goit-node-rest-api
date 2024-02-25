const {Contact} = require("../../models");

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json(result);
};

module.exports = getOneContact;
