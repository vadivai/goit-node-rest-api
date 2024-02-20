// const HttpError = require ("./HttpError.js");

// const validateBody = (schema) => {
//   const func = (req, _, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(HttpError(400, error.message));
//     }
//     next();
//   };

//   return func;
// };

// export default validateBody;

//
// const requestError = require("./requestError");

// const validateBody = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       next(requestError(400, error.message));
//     }
//     next();
//   };
// };

// module.exports = validateBody;
