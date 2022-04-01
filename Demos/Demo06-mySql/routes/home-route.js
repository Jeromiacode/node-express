const express = require('express');
const homeController = require('../controllers/home-controller');
const homeRouter = express.Router();

homeRouter.get('/', homeController.index);
homeRouter.get(['/home', '/index'], (req, res) => res.redirect('/'));
homeRouter.get('/about', homeController.about);

module.exports = homeRouter;