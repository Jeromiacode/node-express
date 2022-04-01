const { Op } = require('sequelize');
const db = require('../models');
const {
  NotFoundErrorResponse,
  ErrorResponse,
} = require('../response-schemas/error-schema');
const { SuccesObjectResponse } = require('../response-schemas/succes-schema');

const messageController = {
  getById: async (req, res) => {
    const id = parseInt(req.params.id);

    const message = await db.Message.findByPk(id, {
      include: {
        model: db.Member,
        attributes: ['id', 'pseudo'],
      },
      attributes: { exclude: ['memberId'] },
    });
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
    const memberId = req.user.id;

    const [nbRows, updatedData] = await db.Message.update(data, {
      where: {
        [Op.and]: [{ id, memberId }],
      },
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
    const { id: memberId, isAdmin } = req.user;

    const target = await db.Message.findByPk(id);
    if (!target) {
      res.status(404).json('Message not found!');
    }
    // if (!(target.memberId === memberId || isAdmin)) {
    if (target.memberId !== memberId && !isAdmin) {
      return res.status(403).json('You don\'t have the right necessary')
    }
    await target.destroy();
    res.sendStatus(204);
  },
};
module.exports = messageController;
