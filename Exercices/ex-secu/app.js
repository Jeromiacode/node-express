const {
  generateKeyFiles,
  encryptString,
  decryptString,
} = require('./utils/security');

const path = require('path');
const publicKeyLocation = path.resolve('data', 'public_key.txt');
const privateKeyLocation = path.resolve('data', 'private_key.txt');
const messageExt = path.resolve('data', 'external_message.txt');

const publicKey = generateKeyFiles();
console.log(publicKey);

const message = 'Hi! Im Jay';
console.log('My Message: \n', message);

const encrypted = encryptString(message, publicKeyLocation);
console.log('My Encrypted Message: \n', encrypted, '\n');

const decrypted = decryptString(encrypted, privateKeyLocation);
console.log('My Decrypted Message: \n', decrypted, '\n');

const encryptedExtMessage = encryptString(messageExt, publicKeyLocation);
console.log('External Encrypted Message: \n', encryptedExtMessage);

const decryptedExtMessage = decryptString(
  encryptedExtMessage,
  privateKeyLocation
);
console.log('External Decrypted Message: \n', decryptedExtMessage, '\n');
