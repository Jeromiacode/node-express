const express = require('express');
const chalk = require('chalk');
const logger = require('./middlewares/logger-middleware');

const homeRoute = require('./routes/home-route');

const port = 8080;
const app = express();


app.set('view engine', 'ejs');
// si on veut personnaliser le chemin du dossier/fichier en question
// const path = require('path');
// const rootDir = process.cwd()
// app.set('views', path.resolve(rootDir, 'views'));

app.use(logger);
// app.use(logger());
// pour récupérer les données du post ↓ anciennement via l'installation du module body-parser
app.use(express.urlencoded({ extended: true }));
app.use(homeRoute);

app.listen(port, () => {
  console.log(chalk.magenta(`Le serveur ${chalk.yellow(port)} tourne bien`));
});
