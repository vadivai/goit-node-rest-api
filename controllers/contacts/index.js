const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const getAllContacts = require("./getAllContacts");
const getOneContact = require("./getOneContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const { controllerWrapper } = require("../../helpers");

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateFavorite: controllerWrapper(updateFavorite),
};
