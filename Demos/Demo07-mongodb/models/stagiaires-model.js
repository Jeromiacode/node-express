const { Schema, model } = require('mongoose');

const StagiaireSchema = new Schema({
    nom: String,
    prenom: String,
    resultat: Number
});

const Stagiaires = model('stagiaires', StagiaireSchema);


// to : stagiaires-controller
module.exports = Stagiaires;