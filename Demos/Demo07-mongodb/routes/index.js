const stagiairesRouter = require('./stagiaires-route');
const router = require('express').Router();

router.use('/stagiaires', stagiairesRouter);

// to : app.js
module.exports = router;
