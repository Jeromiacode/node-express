const fruitsController = require('../controllers/fruits-controller');
const fruitsRouter = require('express').Router();

fruitsRouter.get('/fruit', fruitsController.getOne);
fruitsRouter.get('/fruit', fruitsController.getAll);

fruitsRouter.post('/fruit', fruitsController.insert);
fruitsRouter.put('/fruit', fruitsController.update);
fruitsRouter.delete('/fruit', fruitsController.delete);

// to : app.js
module.exports = fruitsRouter;