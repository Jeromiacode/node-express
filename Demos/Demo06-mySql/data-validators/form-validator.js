const yup = require('yup');

const messageSchema = yup.object().shape({
  pseudo: yup.string().trim().required().min(3).max(50),
  message: yup.string().trim().required().max(1000),
});

module.exports = { messageSchema };
