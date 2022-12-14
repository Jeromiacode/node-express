const categoryController = require('../controllers/category-controller');
const {
  authenticateJWT,
} = require('../middlewares/authenticateJWT-middleware');
const bodyValidator = require('../middlewares/bodyValidator-middelware');
const { categoryValidator } = require('../validators/category-validator');

const categoryRoute = require('express').Router();

categoryRoute
  .route('/')
  .get(categoryController.getAll)
  .post(
    authenticateJWT({ adminRight: true }),
    bodyValidator(categoryValidator),
    categoryController.add
  );
categoryRoute
  .route('/:id([0-9]+)')
  .get(categoryController.getById)
  .put(
    authenticateJWT({ adminRight: true }),
    bodyValidator(categoryValidator),
    categoryController.update
  )
  .delete(authenticateJWT({ adminRight: true }), categoryController.delete);

// to : index.js (routes)
module.exports = categoryRoute;
