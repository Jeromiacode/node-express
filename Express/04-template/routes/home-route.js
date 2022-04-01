const express = require('express');
const homeController = require('../controllers/home-controller');

const homeRoute = express.Router();

homeRoute.get('/', homeController.index);
homeRoute.get(['/index', '/home'], (req, res) => res.redirect('/'));
homeRoute.get('/about', homeController.about);
homeRoute
  .route('/contact')
  .get(homeController.contactGet)
  .post(homeController.contactPost);

module.exports = homeRoute;
