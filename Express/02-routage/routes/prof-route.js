const express = require('express');
const path = require('path');
const profRouter = express.Router();

profRouter.get('/teacher', (request, response) => {
  response.status(200).send('<h2>Teacher Zone</h2>');
});

profRouter.get('/teacher/notfound', (request, response) => {
  response.status(404).sendStatus();
});

// profRouter.get('/teacher/notfound', (request, response) => {
//   response.status(404).send('Page not found');
// });

profRouter.get('/teacher/redirect', (request, response) => {
  response.redirect(301, '/teacher');
});

profRouter.get('/teacher/file/:filename', (request, response) => {
  const filePath = path.resolve(process.cwd(), 'data', request.params.filename);
  response.sendFile(filePath, (error) => {
    if (error) {
      console.log(error);
      response.sendStatus(404);
    } else console.log('Image affichée !');
  });
});

module.exports = profRouter;
