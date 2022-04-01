const express = require('express');
const profRouter = require('./routes/prof-route');
const studentRouter = require('./routes/student-route');

const app = express();
// const app = express(require('express'));

app.get('/', (request, response) => {
  response.status(200).send('<h2>Good Morning Korea !</h2>');
});

app.get('/products?', (request, response) => {
  response.status(200).send('<h2>Route products avec "s" optionel!</h2>');
});

app.get('/product/:id([0-9]+)/detail', (request, response) => {
  const id = parseInt(request.params.id);
  response.status(200).send(`<h2>Détail du produit ${id}</h2>`);
});

app.get(['/jerome', '/morgane'], (request, response) => {
  response.status(200).send('<h2>Coucou Jérôme ou Morgane</h2>');
});

app.get('/personnage/:firstname/:lastname', (request, response) => {
  console.log(request.params);
  const { firstname, lastname } = request.params;
  response.status(200).send(`<h2>Coucou ${firstname} ${lastname}</h2>`);
});

app.use(studentRouter);
app.use(profRouter);
// app.use('/v1', studentRouter); /*permet d'utiliser un préfixe*/

app.listen(8080, () => {
  console.log('Server up on 8080');
});
