const db = require('../models');
const {
  NotFoundErrorResponse,
  ErrorResponse,
} = require('../response-schemas/error-schema');
const { SuccesObjectResponse } = require('../response-schemas/succes-schema');

const messageController = {
  getById: async (req, res) => {
    const id = parseInt(req.params.id);
    const message = await db.Message.findByPk(id);
    if (!message) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Message not found!'));
    }
    res.json(new SuccesObjectResponse(message));
  },
  // PAS besoin de transaction parce que une seul élément géré et 3eme niveau de gestion
  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;
    cont[(nbRows, updatedData)] = await db.Message.update(data, {
      where: { id },
      // sans returning, on aurait pas accès au nbRows et updatedData du dessus ↑ car pas renvoyé
      returning: true,
    });
    if (nbRows !== 1) {
      res.status(400).json(new ErrorResponse('Error during update !'));
    }
    res.json(new SuccesObjectResponse(updatedData));
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    const nbRow = await db.Message.destroy({
      where: { id },
    });
    if (nbRow !== 1) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Message not found!'));
    }
    res.sendStatus(204);
  },
};
module.exports = messageController;
