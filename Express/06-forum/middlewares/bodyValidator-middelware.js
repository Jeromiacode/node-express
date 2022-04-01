const {
  InvalidFieldErrorResponse,
} = require('../response-schemas/error-schema');

const bodyValidator = (
  yupValidator,
  errorCode = 422 /*, s'il doit renvoyer autre chose que le req.body */
) => {
  return (req, res, next) => {
    // strict : pour que 0 et 1 ne soient pas compris comme des booléens dans l'envoi des données.
    yupValidator
      .noUnknown()
      .validate(req.body, { abortEarly: false })
      .then((data) => {
        req.validatedData = data;
        next();
      })
      .catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          const { path, message } = error;
          if (!acc.hasOwnProperty(path)) {
            acc[path] = [message];
          } else acc[path] = [...acc[path], message];
          return acc;
        }, {});
        /////////////////////////////////////////// =
        // const errors = {};
        // err.inner.forEach((acc, error) => {
        //     const { path, message } = error;
        //     if (!acc.hasOwnProperty()) {
        //         acc[path] = [message];
        //     }
        //     else acc[path].push(message);
        // });
        /////////////////////////////////////////// =
        // const errors = {};
        // for (const error of err.inner) {
        //     const { path, message } = error;
        //     if (!acc.hasOwnProperty()) {
        //         acc[path] = [message];
        //     }
        //     else acc[path].push(message);
        // }
        // res.status(errorCode).json({
        //     status: errorCode,
        //     errors,
        //     values: err.value
        // });
        res
          .status(errorCode)
          .json(
            new InvalidFieldErrorResponse('Data invalide', errors, errorCode)
          );
      });
  };
};

// to : category-route & subject-route & message-route & user-route
module.exports = bodyValidator;
