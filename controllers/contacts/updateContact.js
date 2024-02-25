const {Contact} = require("../../models");

const updateContact = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json(result);
};

module.exports = updateContact;
