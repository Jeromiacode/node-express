const customRenderMiddleware = (title) => {
  return (req, res, next) => {
    res.renderCustom = (template, data = {}) => {
      res.render(template, {
        title: title,
        session: req.session,
        ...data,
      });
    };
    next();
  };
};

// importé dans app.js
module.exports = customRenderMiddleware;
