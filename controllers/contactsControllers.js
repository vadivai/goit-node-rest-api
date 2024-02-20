// const controllerWrapper = require("../../helpers/controllerWrapper");
// module.exports = {
//   getAll: controllerWrapper(getAll),
//   getById: controllerWrapper(getById),
//   removeById: controllerWrapper(removeById),
//   add: controllerWrapper(add),
//   updateById: controllerWrapper(updateById),
// };

const httpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");

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
    // Отримує body в json-форматі з полями {name, email, phone}.
    // Усі поля є обов'язковими - для валідації створи у файлі contactsSchemas.js (знаходиться у папці schemas) схему з використаням пакета joi
    // Якщо в body немає якихось обов'язкових полів (або передані поля мають не валідне значення), повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400
    // Якщо body валідне, викликає функцію-сервіс addContact для роботи з json-файлом contacts.json, з передачею їй даних з body
    // За результатом роботи функції повертає новостворений об'єкт з полями {id, name, email, phone} і статусом 201
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    // Отримує body в json-форматі з будь-яким набором оновлених полів (name, email, phone) (всі поля вимагати в боді як обов'язкові не потрібно: якщо якесь із полів не передане, воно має зберегтись у контакта зі значенням, яке було до оновлення)
    // Якщо запит на оновлення здійснено без передачі в body хоча б одного поля, повертає json формату {"message": "Body must have at least one field"} зі статусом 400.
    // Передані в боді поля мають бути провалідовані - для валідації створи у файлі contactsSchemas.js (знаходиться у папці schemas) схему з використанням пакета joi. Якщо передані поля мають не валідне значення, повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400
    // Якщо з body все добре, викликає функцію-сервіс updateContact, яку слід створити в файлі contactsServices.js (знаходиться в папці services). Ця функція має приймати id контакта, що підлягає оновленню, та дані з body, і оновити контакт у json-файлі contacts.json
    // За результатом роботи функції повертає оновлений об'єкт контакту зі статусом 200.

    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsService.updateContact({
      id,
      name,
      email,
      phone,
    });
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
// Валідацію body можна як здійснювати у контролері, так і створити для цих цілей окрему міддлвару, яка буде викликатись до контролера. Для створення міддлвари можеш скористатись функцією validateBody.js, яку знайдеш у папці helpers
// Для роботи з помилками можна скористатись функцією HttpError.js, яку знайдеш у папці helpers
// Якщо вказані функції використовувати не будеш, видали їх з проєкту перед тим, як надсилатимеш роботу на перевірку ментору
