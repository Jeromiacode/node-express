const express = require('express');
const homeRouter = express.Router();

const middlewareRoute = (req, res, next) => {
  console.log('Home');
  next();
};

homeRouter.get(['/', '/home'], (req, res) => {
  res.status(200).send('<h2>Velcome Home ! </h2>');
});

homeRouter.get('/error', () => {
  throw new Error('Erreur !');
});

homeRouter.use(middlewareRoute);

module.exports = homeRouter;
