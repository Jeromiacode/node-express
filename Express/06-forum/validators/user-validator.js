const yup = require('yup');

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/;

const registerValidator = yup.object().shape({
    pseudo: yup.string().trim().required().max(50),
    email: yup.string().trim().required().email().max(50),
    // ↓ jamais trim() le mot-de-passe !
    password: yup.string().required().min(8).max(64).matches(pwdRegex),
  });
  

const loginValidator = yup.object().shape({
    login: yup.string().trim().required(),
    password: yup.string().required(),
  });
  
  // to : user-route (param of validator-middelware)
  module.exports = {
    registerValidator,
    loginValidator
  }