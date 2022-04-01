const express = require('express');
const studentRouter = express.Router();
// const studentRouter =  require('express').Router();

studentRouter.get('/student', (request, response) => {
  response.status(200).send('<h2>Student Zone</h2>');
});

studentRouter.get('/student/:studentId([0-9]+)', (request, response) => {
  response
    .status(200)
    .send(`<h2>Student id : ${request.params.studentId}</h2>`);
});

studentRouter
  .route('/student/formulaire')
  .get((request, response) => {
    response.status(200).send(`<h2> formulaire étudiants </h2>
    <form method="POST"><input type='text' name='studentName' />
    <button type='submit'>Envoyer</button></form>`);
  })
  .post((request, response) => {
    response.status(200).send('Contactez les students');
  });

module.exports = studentRouter;
