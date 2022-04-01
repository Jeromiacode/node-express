const express = require('express');
const fruitsRouter = require('./routes/fruits-route');
const app = express();

// pour nos requètes .post
app.use(express.json());
app.use(fruitsRouter);

app.listen(8080, () => {
  console.log('Le serveur tourne au port 8080 !');
});
