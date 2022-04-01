// TODO git Aurelien
const { decodeJWT } = require('../utils/jwt-utils');
const db = require('../models');

// TODO a implémenter sur toutes les routes !
const authenticateJWT = (adminRight) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const tokenData = decodeJWT(token);
      req.user = tokenData;
      if (adminRight) {
        const admin = await db.Member.findOne(tokenData.id, {
           where: { isAdmin: true },
         });
        if (!admin) {
          return res.sendStatus(403);
        }
      }
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  };
};

// to :
module.exports = { authenticateJWT };
