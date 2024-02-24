const httpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const validateBody = require("../helpers/validateBody.js");
const controllerWrapper = require("./controllerWrapper.js");
const Contact = require("../models/contact.js");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  // якщо якесь із полів не передане, воно має зберегтись у контакта зі значенням, яке було до оновлення)
  const { id } = req.params;
  // const { name, email, phone } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Body must have at least one field");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

// module.exports = {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// };

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
};

// Зверни увагy
// Валідацію body можна як здійснювати у контролері, так і створити для цих цілей окрему міддлвару, яка буде викликатись до контролера.
