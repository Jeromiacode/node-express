const db = require('../models');
const {
  NotFoundErrorResponse,
  ErrorResponse,
} = require('../response-schemas/error-schema');
const {
  SuccesObjectResponse,
  SuccesArrayResponse,
} = require('../response-schemas/succes-schema');

const categoryController = {
  getAll: async (req, res) => {
    const data = await db.Category.findAndCountAll({
      order: [['name', 'ASC']],
      offset: req.pagination.offset,
      limit: req.pagination.limit,
    });
    res.json(new SuccesArrayResponse(data.rows, data.count));
  },
  getById: async (req, res) => {
    const id = parseInt(req.params.id);
    const category = await db.Category.findOne({
      // { id: id }
      where: { id },
    });
    if (!category) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Category not found!'));
    }
    res.json(new SuccesObjectResponse(category));
  },
  add: async (req, res) => {
    const data = req.validatedData;
    const newCategory = await db.Category.create(data);
    res.json(new SuccesObjectResponse(newCategory));
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;
    const resultUpdate = await db.Category.update(data, {
      where: { id },
      // ↓ returning : PAS avec MariaDB !!!
      returning: true,
    });
    const nbRows = resultUpdate[0];
    if (nbRows !== 1) {
      return res.json(new ErrorResponse('Error updated data!'));
    }
    const updateData = resultUpdate[1];
    res.status(200).json(new SuccesObjectResponse(updateData[0]));
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    const nbRows = await db.Category.destroy({
      where: { id },
    });
    if (nbRows !== 1) {
      res.status(404).json(new NotFoundErrorResponse('Category not found!'));
    }
    res.sendStatus(204);
  },
};
// to : category-route
module.exports = categoryController;
