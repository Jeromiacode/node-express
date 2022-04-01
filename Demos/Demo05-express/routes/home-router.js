const homeController = require('../controllers/home-controller');
// pour les formulaires et leur data
const multer = require('multer');

const homeRouter = require('express').Router();
// TODO regarder pour les méthodes (.single, .array ...)
const upload = multer({ dest: 'storage' });

homeRouter.get('/', homeController.index);
homeRouter.get('/contact', homeController.contact);
homeRouter.post('/contact', upload.single('myFile'), homeController.contactPost);

module.exports = homeRouter;
