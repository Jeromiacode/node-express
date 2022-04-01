const jwt = require('jsonwebtoken');

const generateJWT = ({ id, pseudo, isAdmin }) => {
  return new Promise((resolve, reject) => {
      const data = { id, pseudo, isAdmin };
      const secret = process.env.JWT_SECRET;
      const options = {
          algorithm: 'HS512',  // HS256 par default
          audience: process.env.JWT_AUDIENCE,
          issuer: process.env.JWT_ISSUER,
          expiresIn: '12h'
      };

      jwt.sign(data, secret, options, (error, token) => {
          if (error) {
              return reject(error);
          }
          // récupère la date d'expiration pour l'affichée
          const expire = new Date(jwt.decode(token).exp * 1000).toISOString();
          resolve({ token, expire });
      });
  });
};

const decodeJWT = (token) => {
  if (!token) {
      return Promise.reject(new Error('Indalid JWT'));
  }

  return new Promise((resolve, reject) => {
      const secret = process.env.JWT_SECRET;
      const optionsVerify = {
          audience: process.env.JWT_AUDIENCE,
          issuer: process.env.JWT_ISSUER,
      };
      jwt.verify(token, secret, optionsVerify, (error, data) => {
          if (error) {
              return reject(error);
          }

          resolve({
              id: data.id,
              pseudo: data.pseudo,
              isAdmin: data.isAdmin
          });
      });
  });
};

// to : user-controller
module.exports = { generateJWT, decodeJWT };
