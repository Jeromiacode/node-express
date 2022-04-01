const userController = require('../controllers/user-controller');
const bodyValidator = require('../middlewares/bodyValidator-middelware');
const {
  loginValidator,
  registerValidator,
} = require('../validators/user-validator');

const userRoute = require('express').Router();

userRoute
  .route('/login')
  .post(bodyValidator(loginValidator), userController.login);
userRoute
  .route('/register')
  .post(bodyValidator(registerValidator), userController.register);

// to : index (routes)
module.exports = userRoute;
