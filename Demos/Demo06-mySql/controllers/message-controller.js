const { messageSchema } = require('../data-validators/form-validator');
const messageModel = require('../models/message-model');
const { getErrorMessage } = require('../utils/error-utils');

const messageController = {
  index: (req, res) => {
    messageModel.getAll().then((messages) => {
      res.render('message/index', { title: 'Mes messages', messages });
    });
  },
  detail: (req, res) => {
    const { id } = req.params;
    console.log(id);
  TODO
    res.render('message/detail', { title: `Détail du message ${id}` });
  },
  messageFormGET: (req, res) => {
    res.render('message/newMessage', {
      errors: null,
      title: 'Nouveau message',
      data: {
        pseudo: 'pierre',
      },
    });
  },
  messageFormPOST: (req, res) => {
    // const { body } = req; /* = req.body */

    messageSchema
      // abordEarly pour renvoyer toutes les erreurs une a une et ne pas s'arrêter a la 1ere
      .validate(req.body, { abortEarly: false })
      .then((data) => {
        messageModel
          .insert({
            pseudo: data.pseudo,
            content: data.message,
          })
          .then((id) => {
            console.log(`Message ${id}`);
          });
        res.redirect('/message');
      })
      // message d'erreur perso !
      .catch((validationError) => {
        console.log(validationError);
        const errors = getErrorMessage(validationError);
        const data = validationError.value;
        res.render('message/newMessage', {
          title: 'Corrige ton message',
          errors,
          data,
        });
      });
  },
};

module.exports = messageController;
