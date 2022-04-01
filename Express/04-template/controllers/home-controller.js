const express = require('express');
const yup = require('yup');

const homeController = {
  /**
   *
   * @param {express.Request} request
   * @param {express.Response} response
   */
  index: (request, response) => {
    response.render('home/index');
  },
  about: (request, response) => {
    const author = { firstname: 'Paul', lastname: 'Franck' };
    response.render('home/about', {
      firstname: author.firstname,
      lastname: author.lastname,
    });
  },
  contactGet: (request, response) => {
    const categories = ['backend', 'frontend', 'db'];
    response.render('home/contact', { categories });
  },
  contactPost: (request, response) => {
    console.log(request.body);
    const email = request.body.email;
    // module yuk qui permet de ne pas avoir 10.000 if()
    const schemaBody = yup.object().shape({
      email: yup.string().required().email(),
      category: yup.string().required(),
      message: yup.string().required(),
    });

    if(schemaBody.isValidSync(request.body)){
      response.render('home/contact-response', { email });
    }
    else {
      response.redirect('/contact');
    }
  },
};

module.exports = homeController;
