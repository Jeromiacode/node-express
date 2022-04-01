const express = require('express');
const pagination = require('./middlewares/pagination-middleware');
require('express-async-errors');
require('dotenv-flow').config();

const { PORT, NODE_ENV } = process.env;
const app = express();

//Middlewares
app.use(express.json());
app.use(pagination(/* {defaultLimit : 2} */));

const db = require('./models');
const router = require('./routes');

// Connection DB
db.sequelize
  .authenticate()
  .then(() => console.log('connection DB - Réussie !'))
  .catch((err) => console.log('connection DB - Echec !', err));
//Sync de la SB avec les models (à ne jamais faire en prod !)
if (NODE_ENV !== 'production') {
  // alter : permet juste de modifier, force : permet de drop les colonnes dans notre DB
  // db.sequelize.sync({ force: true });
}

app.use('', router);

app.listen(PORT, () => {
  console.log(`Serveur tourne au port ${PORT} [${NODE_ENV}]`);
});
