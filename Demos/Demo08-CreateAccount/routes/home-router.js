const homeController = require('../controllers/home-controller');


const homeRouter = require('express').Router();

homeRouter.get('', homeController.index);


module.exports = homeRouter;