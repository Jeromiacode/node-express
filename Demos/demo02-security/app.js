const { generateSalt, hash, generateKeys } = require('./utils/security');

const salt = generateSalt(12);
console.log(salt);

const hashed = hash('Jeromia', salt);
console.log(hashed);

const pwd = 'caca';

const toCompare = hash(pwd, salt);
console.log(toCompare === hashed);

generateKeys()
  .then((obj) => {
    console.log(obj.privateKey);
    console.log(obj.publicKey);
  })
  .catch((err) => {
    // code a effectué en cas d'échec
  });
