const subjectController = require('../controllers/subject-controller');
const bodyValidator = require('../middlewares/bodyValidator-middelware');
const { messageValidator } = require('../validators/message-validator');
const { subjectValidator, subjectUpdateValidator, subjectCategoriesValidator } = require('../validators/subject-validator');

const subjectRoute = require('express').Router();

//Principales
subjectRoute
  .route('/')
  .get(subjectController.getAll)
  .post(bodyValidator(subjectValidator),subjectController.add)
subjectRoute
  .route('/:id([0-9]+)')
  .get(subjectController.getOne)
  .put(bodyValidator(subjectUpdateValidator),subjectController.update)
  .delete(subjectController.delete);
// Catégories
subjectRoute
  .route('/:id([0-9]+)/addCategory')
  .post(bodyValidator(subjectCategoriesValidator),subjectController.addCategory)
subjectRoute
  .route('/:id([0-9]+)/removeCategory')
  .delete(bodyValidator(subjectCategoriesValidator),subjectController.removeCategory)
// Messages
subjectRoute
  .route('/:id([0-9]+)/message')
  .get(bodyValidator(messageValidator),subjectController.getAllMessage)
  .post(subjectController.addMessage)

  // to : index.js (routes)
module.exports = subjectRoute;
