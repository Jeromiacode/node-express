const homeController = {
  index: (req, res) => {
    console.log(req.session);
    // res.render('home/index', { session: req.session });
    res.renderCustom('home/index')
  },
};

module.exports = homeController;
