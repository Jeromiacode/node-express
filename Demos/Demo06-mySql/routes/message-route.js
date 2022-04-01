const messageController = require('../controllers/message-controller');
const messageRouter = require('express').Router();

messageRouter.get('/message', messageController.index);
messageRouter.get('/message/detail', messageController.detail);
// messageRouter
//   .get('/message/new', messageController.messageFormGET)
//   .post('/message/new', messageController.messageFormPOST);
messageRouter.route('/message/new')
  .get(messageController.messageFormGET)
  .post(messageController.messageFormPOST);

module.exports = messageRouter;
