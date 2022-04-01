const { decodeJWT } = require('../utils/jwt-utils');
const db = require('../models');
const { Op } = require('sequelize');

const authenticateJWT = (adminRight) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }
    let tokenData;
    try {
      tokenData = await decodeJWT(token);
    } catch (err) {
      return res.sendStatus(403);
    }
      if (options.adminRight) {
        const admin = await db.Member.findOne({
           where: { 
             [Op.and]: [{
               id: tokenData.id,isAdmin: true
             }] },
         });
        if (!admin) {
          return res.sendStatus(403);
        }
      }
      next();
  };
};

// to : (all)-controller
module.exports = { authenticateJWT };
