const express = require('express');
const fruitsRouter = require('./routes/fruits-route');
const app = express();

// SWAGGER
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: 'API exemple',
            title: 'Recap sur les API',
            version: '0.1.0',
        }
    },
    apis: [
        './routes/fruits-route.js'
    ]
}

const swaggerSpec = swaggerJsDoc(options);
const swaggerUI = require('swagger-ui-express')
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// pour nos requètes .post
app.use(express.json());
app.use(fruitsRouter);

app.listen(8080, () => {
  console.log('Le serveur tourne au port 8080 !');
});
