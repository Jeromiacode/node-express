const express = require('express');
const homeRouter = require('./routes/home-route');

const app = express();

const middleware = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(middleware);
app.use(homeRouter);

app.listen(8080, () => {
  console.log('Le serveur tourne au port 8080');
});
