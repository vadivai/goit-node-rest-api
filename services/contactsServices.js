// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "../db/contacts.json");

// async function listContacts() {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const contactById = contacts.find((contact) => contact.id === contactId);
//   return contactById || null;
// }

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) return null;
//   const [removedContact] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return removedContact;
// }

// async function addContact({ name, email, phone }) {
//   const contacts = await listContacts();
//   const newContact = { name, email, phone, id: nanoid() };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

// async function updateContact(id, updateData) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) return null;
//   contacts[index] = { id, ...contacts[index], ...updateData };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
