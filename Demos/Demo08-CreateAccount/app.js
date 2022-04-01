const express = require('express');
const session = require('express-session');
const customRenderMiddleware = require('./middlewares/custom-render-middleware');
const homeRouter = require('./routes/home-router');
const memberRouter = require('./routes/member-route');

// Chargement des variables d'environement
require('dotenv-flow').config();

// Création du serveur web
const app = express();

// Variable de config
const { PORT, NODE_ENV, SESSION_SECRET } = process.env;
// test DB
require('./utils/db-utils').testDbConnection();

// storage session in file
const FileStore = require('session-file-store')(session);

// Active session in Express pour cookie
app.use(session({
    store: new FileStore({}),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

// Configurgation
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(customRenderMiddleware('Jerome'));

// Routing
app.use(homeRouter);
app.use(memberRouter);

// Demarrage du serveur Web
app.listen(PORT, () => {
    console.log(`Web Server running on port ${PORT} [${NODE_ENV}]`);
});