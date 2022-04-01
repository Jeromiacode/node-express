const crypto = require('crypto');
const fs = require('fs');

const path = require('path');
const publicKeyLocation = path.resolve('data', 'public_key.txt');
const privateKeyLocation = path.resolve('data', 'private_key.txt');

exports.generateKeyFiles = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  fs.writeFileSync(publicKeyLocation, keyPair.publicKey);
  fs.writeFileSync(privateKeyLocation, keyPair.privateKey);
  return keyPair;
};

exports.encryptString = (plaintext, publicKeyFile) => {
  const publicKey = fs.readFileSync(publicKeyFile, 'utf8');

  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plaintext));
  return encrypted.toString('base64');
};

exports.decryptString = (cryptedMessage, privateKeyFile) => {
  const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: '',
    },
    Buffer.from(cryptedMessage, 'base64')
  );

  return decrypted.toString('utf8');
};
