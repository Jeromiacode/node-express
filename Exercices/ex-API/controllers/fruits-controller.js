const fruitsModel = require('../models/fruits-model');

const fruitsController = {
  getOne: (req, res) => {
    const targetId = req.params.id;
    const fruit = fruitsModel.getById(targetId);
    res.status(200).json(fruit);
  },
  getAll: (req, res) => {
    const fruits = fruitsModel.getByAll();
    res.status(200).json(fruits);
  },
  insert: (req, res) => {
    if (!req.body.name) {
      return res.sendStatus(422);
    }
    // const newFruit = {
    //   name: req.body.name,
    // };
    // fruitsModel.create(newFruit);
    // ↑ pareil //
    const newFruit = fruitsModel.create({
      name: req.body.name,
    });
    res.json(newFruit);
  },
  update: (req, res) => {
    res.sendStatus(501);
  },
  delete: (req, res) => {
    const targetId = req.params.id;
    const isOk = fruitsModel.delete(targetId);

    if (isOk) {
      return res.sendStatus(204);
    }
    res.sendStatus(404);
  },
};

// to : fruits-route (routes)
module.exports = fruitsController;
