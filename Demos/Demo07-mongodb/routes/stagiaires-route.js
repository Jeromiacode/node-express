const stagiairesController = require('../controllers/stagiaires-controller')

const stagiairesRouter = require('express').Router();

stagiairesRouter.route('/')
.get(stagiairesController.get)
.post(stagiairesController.add)

stagiairesRouter.route('/:id')
.get(stagiairesController.getById)
.put(stagiairesController.update)
.delete(stagiairesController.delete)

// to : index.js
module.exports = stagiairesRouter;