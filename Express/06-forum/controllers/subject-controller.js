const db = require('../models');
const {
  NotFoundErrorResponse,
  ErrorResponse,
} = require('../response-schemas/error-schema');
const {
  SuccesArrayResponse,
  SuccesObjectResponse,
} = require('../response-schemas/succes-schema');

// PRINCIPALES
const subjectController = {
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;

    const { rows, count } = await db.Subject.findAndCountAll({
      // distinct permet de ne pas compter les lignes jointes (findAndCountAll)
      distinct: true,
      offset,
      limit,
      include: {
        model: db.Category,
        through: { attributes: ['categoryId'] },
      },
    });
    res.json(new SuccesArrayResponse(rows, count));
  },
  getOne: async (req, res) => {
    const id = parseInt(req.params.id);
    const subject = await db.Subject.findByPK(id, {
      //permet d'afficher les infos de notre table
      // include: db.Category
      //permet d'afficher seulement une selection des infos ou rien si vide
      model: db.Category,
      through: { attributes: ['categoryId'] },
    });
    if (!subject) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Subject not found!'));
    }
    res.json(new SuccesObjectResponse(subject));
  },
  add: async (req, res) => {
    const data = await req.validatedData;
    // Sécurité pour s'assurer que toutes les opé DB soient réalisées
    const transaction = await db.sequelize.transaction();
    try {
      const newSubject = await db.Subject.create(data, { transaction });
      // ajoute category si aucune
      await newSubject.addCategory(data.categories, { transaction });

      await transaction.commit();
      res.json(new SuccesObjectResponse(newSubject));
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;

    // Faire toutes les modifs, ou Rien
    const transaction = await db.sequelize.transaction();

    // [nbRows, updatedData] = resultUpdate;
    const [nbRows, updatedData] = await db.Subject.update(data, {
      where: { id },
      // ↓ récupère les donées mises a jour
      returning: true, // only mssql et postgrey
      transaction,
    });
    if (nbRows !== 1) {
      await transaction.rollback();
      // si recherche sur autre chose que l'id => .rollback() ↑
      return res.status(400).json(new ErrorResponse('Error during update!'));
    }
    await transaction.commit();
    res.json(updatedData);
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    const transaction = db.sequelize.transaction();

    const nbRows = await db.Subject.destroy({
      // car on supprime juste l'élément selectionné ! Si tout : pas de where
      where: { id },
      transaction,
    });
    if (nbRows !== 1) {
      await transaction.rollback();
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Subject not found!'));
    }
    await transaction.comit();
    res.sendStatus(204);
  },
  // CATEGORIES
  addCategory: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;

    const subject = await db.Subject.findByPK(id);

    if (!subject) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Category not found!'));
    }

    subject.addCategory(data.categories);

    res.json(new SuccesObjectResponse(subject));
  },
  removeCategory: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;

    const subject = await db.Subject.findByPK(id);

    if (!subject) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Category not found!'));
    }

    subject.removeCategory(data.categories);

    res.json(new SuccesObjectResponse(subject));
  },
  //MESSAGES
  getAllMessage: async (req, res) => {
    const id = parseInt(req.params.id);
    const { offset, limit } = req.pagination;
    const { rows, count } = await db.Message.findAndCountAll({
      attributes: { exclude: ['subjectId'] },
      where: { id },
      order: [['creatAt', 'DESC']],
      offset,
      limit,
    });
    res.json(new SuccesArrayResponse(rows, count));
  },
  addMessage: async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.validatedData;
    // ↓ transaction sur un select est overkill donc on évite !
    const subject = db.Subject.findByPk(id);
    if (!subject) {
      return res
        .status(404)
        .json(new NotFoundErrorResponse('Subject not found!'));
    }
    const transaction = await db.sequelize.transaction();
    try {
      // ↓ .addMessages fonctionne aussi
      const newMessage = await subject.createMessage(data, { transaction });
      await transaction.commit();
      res.json(new SuccesObjectResponse(newMessage));
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  },
};

// to : subject-route
module.exports = subjectController;
