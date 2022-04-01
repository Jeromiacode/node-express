const yup = require('yup');

const messageValidator = yup.object().shape({
  content: yup.string().trim().required().min(1).max(1_000),
});

// to : message-route (param of validator-middelware)
module.exports = {
    messageValidator,
};
