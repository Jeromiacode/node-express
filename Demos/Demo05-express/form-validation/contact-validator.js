const yup = require('yup');

const contactValidator = yup.object().shape({
  pseudo: yup.string().trim().required(),
  nbPerson: yup.number().positive().integer().required(),
});

module.exports = {
    contactValidator
};