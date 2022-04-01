const { ValidationError } = require('yup');

/**
 * Permet de générer les messages d'erreur via Yup
 * @param {ValidationError} validationError
 * @returns {object}
 */
const getErrorMessage = (validationError) => {
  // const errors = {};
  // const results = validationError.inner.forEach((current) => {
  //   const { path, message } = current;
  //   if (!errors[path]) {
  //       errors[path] = message;
  //   }
  // });
  //   return results;
  //
  // Pareil a ↓
  const results = validationError.inner.reduce((errors, current) => {
    // result const { path, message } = current; /* possible sans return a la fin */
    const { path, message } = current;
    if (!errors[path]) {
      errors[path] = message;
    }
    return errors;
  }, {});
  return results;
};

module.exports = { getErrorMessage };
