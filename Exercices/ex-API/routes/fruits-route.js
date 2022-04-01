const fruitsController = require('../controllers/fruits-controller');
const fruitsRouter = require('express').Router();

/**
 * @swagger
 * /fruit :
 */

/**
 * @openapi
 * /fruit :
 *  get: 
 *      description: Permet de récupérer tout les fruits
 *      responses:
 *          200:
 *              description: Renvoi la liste de fruits
 */
fruitsRouter.get('/fruit', fruitsController.getAll);
/**
 * @openapi
 * /fruit :
 *  post:
 *      description: Permet d'ajouter un fruit
 *      responses:
 *          200:
 *              description: Renvoi le fruit ajouté
 */
fruitsRouter.post('/fruit', fruitsController.insert);

/**
 * @openapi
 * /fruit/{id} :
 *  get: 
 *      description: Permet de récupérer un fruit
 *      responses:
 *          200:
 *              description: Renvoi le fruit
 */
fruitsRouter.get('/fruit/:id', fruitsController.getOne);
/**
 * @openapi
 * /fruit/{id} :
 *  put: 
 *      description: Permet de mettre à jour un fruit
 *      responses:
 *          501:
 *              description: Pas encore implémenté
 */
fruitsRouter.put('/fruit/:id', fruitsController.update);
/**
 * @openapi
 * /fruit/{id} :
 *  delete: 
 *      description: Permet de supprimer un fruit
 *      responses:
 *          200:
 *              description: Renvoi ...
 */
fruitsRouter.delete('/fruit/:id', fruitsController.delete);

// to : app.js
module.exports = fruitsRouter;