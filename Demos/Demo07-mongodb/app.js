const express = require('express');
const { connect } = require('mongoose')

connect('mongodb://localhost:27017/formation')

const app = express();
app.use(express.json())

const router = require('./routes');
app.use('', router);

app.listen(8080, () => {
  console.log(`Serveur tourne au port 8080`);
});
