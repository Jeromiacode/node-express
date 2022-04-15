const Stagiaires = require('../models/stagiaires-model')
// pour éviter que mongoose plante si jamais l'id est différent !
const { isValidObjectId } = require('mongoose')

// Pour les conventions d'API Restful : les méthodes add, update et remove ne devraient rien retourner !
const stagiairesController = {
    get: async (req, res) => {

        let {limit, offset} = req.query;

        limit = limit ?? 6;
        offset = offset ?? 0;

        if (limit <= 0 || offset < 0) {
            res.sendStatus(400)
        }

        const result = await Stagiaires
        .find()
        .skip(offset)
        .limit(limit)
        res.json(result)
    },
    getById: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
           return res.sendStatus(404)
        }
        const result = await Stagiaires.findById({ _id: req.params.id });
        if (!result) {
            res.sendStatus(404);
        }
        res.json(result);
    },
    add: async (req, res) => {
        // vérifier la validité des données (req.body) et retourner une erreur si invalide (yup)
        const result = await Stagiaires.create(req.body);
        res.json(result);
    },
    update: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            return res.sendStatus(404)
         }
         // {new: true} pour directement récupéré l'objet modifié (insomnia)
        const result = await Stagiaires.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            res.sendStatus(404);
        }
        res.json(result);
    },
    delete: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            return res.sendStatus(404)
         }
        const result = await Stagiaires.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
        }
        res.json(result);
    },
}

// to : stagiaires-route
module.exports = stagiairesController;