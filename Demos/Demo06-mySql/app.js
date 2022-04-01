const express = require('express');
const homeRouter = require('./routes/home-route');
const messageRouter = require('./routes/message-route');


// ↓ pour la gestion du port via .env on ajoute > npm i dotenv-flow cross-env
require('dotenv-flow').config();
const { PORT, NODE_ENV } = process.env;

// require('./utils/db-utils').testDbConnection();

const app = express();
// const port = 8080;
// const mode = 'Dev';
// app.get('/', (req, res) => {
//   res.send('<h1>hello Mia ♥</h1');
// });

app.set('view engine', 'ejs');
// app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(homeRouter);
app.use(messageRouter);

// Pour gèrer la page d'erreur
app.use((req, res) =>
  res.status(404).send('ERREUR 404 - you suck ! ♥ bamboos')
);

app.listen(PORT, () => {
  console.log(`Le serveur tourne au port ${PORT} en mode [${NODE_ENV}]`);
  //   console.log(`Le serveur tourne au port ${port} [${mode}]`);
});
