const messageController = require('../controllers/message-controller');
const {
  authenticateJWT,
} = require('../middlewares/authenticateJWT-middleware');
const bodyValidator = require('../middlewares/bodyValidator-middelware');
const { messageValidator } = require('../validators/message-validator');

const messageRoute = require('express').Router();

messageRoute
  .route('/:id([0-9]+)')
  .get(messageController.getById)
  .put(
    authenticateJWT(),
    bodyValidator(messageValidator),
    messageController.update
  )
  .delete(authenticateJWT(), messageController.delete);

// to : index.js (routes)
module.exports = messageRoute;
