const subjectController = require('../controllers/subject-controller');
const {
  authenticateJWT,
} = require('../middlewares/authenticateJWT-middleware');
const bodyValidator = require('../middlewares/bodyValidator-middelware');
const { messageValidator } = require('../validators/message-validator');
const {
  subjectValidator,
  subjectUpdateValidator,
  subjectCategoriesValidator,
} = require('../validators/subject-validator');

const subjectRoute = require('express').Router();

//Principales
subjectRoute
  .route('/')
  .get(subjectController.getAll)
  .post(
    authenticateJWT(),
    bodyValidator(subjectValidator),
    subjectController.add
  );
subjectRoute
  .route('/:id([0-9]+)')
  .get(subjectController.getOne)
  .put(
    authenticateJWT(),
    bodyValidator(subjectUpdateValidator),
    subjectController.update
  )
  .delete(authenticateJWT(), subjectController.delete);
// Catégories
subjectRoute
  .route('/:id([0-9]+)/addCategory')
  .post(
    authenticateJWT(),
    bodyValidator(subjectCategoriesValidator),
    subjectController.addCategory
  );
subjectRoute
  .route('/:id([0-9]+)/removeCategory')
  .delete(
    authenticateJWT(),
    bodyValidator(subjectCategoriesValidator),
    subjectController.removeCategory
  );
// Messages
subjectRoute
  .route('/:id([0-9]+)/message')
  .get(bodyValidator(messageValidator), subjectController.getAllMessage)
  .post(authenticateJWT(), subjectController.addMessage);

// to : index.js (routes)
module.exports = subjectRoute;
