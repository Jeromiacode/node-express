const jwt = require('jsonwebtoken');

const generateJWT = ({ id, pseudo, isAdmin }) => {
  const data = { id, pseudo, isAdmin };

  const secret = process.env.JWT_SECRET;
  const audience = process.env.JWT_AUDIENCE;
  const issuer = process.env.JWT_ISSUER;
  // ↓ 10800, 180m
  const expiresIn = '3h';

  const token = jwt.sign(data, secret, {
    audience,
    issuer,
    expiresIn,
    algorithm: 'HS512',
  });

  return {
    token,
    // récupère la date d'expiration pour l'afficher
    expires: new Date(jwt.decode(token).exp * 1000).toISOString(),
  };
};

const decodeJWT = (token) => {
  if (!token) {
    throw new Error('Invalid JWT');
  }
  const optionsVerify = {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  };
  const data = jwt.verify(token, process.env.JWT_SECRET, optionsVerify);

  return {
    id: data.id,
    pseudo: data.pseudo,
    isAdmin: data.isAdmin,
  };
};

// to : user-controller
module.exports = { generateJWT, decodeJWT };
