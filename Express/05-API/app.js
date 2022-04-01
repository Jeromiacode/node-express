const express = require('express');
const router = require('./routes');

require('dotenv-flow').config();

const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(express.json());
app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`Serveur tourne au port ${PORT} [${NODE_ENV}]`);
});
