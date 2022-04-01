const { contactValidator } = require('../form-validation/contact-validator');
const authorData = require('../data/author.json')

const homeController = {
  index: (req, res) => {
    const data = {
      fullname: authorData.firstname + ' ' + authorData.lastname,
      image: authorData.image
    }
    res.render('home/index', data);
  },

  contact: (req, res) => {
    res.render('home/contact');
  },

  contactPost: (req, res) => {
    if (!contactValidator.isValidSync(req.body)) {
        // return pour arreter la fonction
      res.redirect('/contact');
      return;
    }
    // sauvegarde ça en DB en général !
    console.log(req.body);
    console.log(req.file);
    res.render('home/contactResponse')
  },
};

module.exports = homeController;
