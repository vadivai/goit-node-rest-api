// const controllerWrapper = require("../../helpers/controllerWrapper");
// module.exports = {
//   getAllContacts: controllerWrapper(getAllContacts),
//   getOneContact: controllerWrapper(getOneContact),
//   removeContact: controllerWrapper(removeContact),
//   addContact: controllerWrapper(addContact),
//   updateContact: controllerWrapper(updateContact),
// };

// const controllerWrapper = (controller) => {
//   const controllerFunc = async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
//   return controllerFunc;
// };

const httpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const validateBody = require("../helpers/validateBody.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw httpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw httpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    // якщо якесь із полів не передане, воно має зберегтись у контакта зі значенням, яке було до оновлення)
    const { id } = req.params;
    // const { name, email, phone } = req.body;

    if (Object.keys(req.body).length === 0) {
      throw httpError(400, "Body must have at least one field");
    }

    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw httpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};

// Зверни увагy
// Валідацію body можна як здійснювати у контролері, так і створити для цих цілей окрему міддлвару, яка буде викликатись до контролера.
