const crypto = require('crypto');

// 1 octet ou byte = 8 bits (2exp8) : 256 possibilités
// #FF0000 = rgb(255,0,0)
// Donc FF vaut 1 byte => possibilités / 2
exports.generateSalt = (count) => {
  const bytes = crypto.randomBytes(Math.ceil(count / 2));
  return bytes.toString('hex').slice(0, count);
};

exports.hash = (data, salt) => {
  const hmac = new crypto.Hmac('sha512', salt);
  hmac.update(data);

  return hmac.digest('hex');
};

exports.generateKeys = () => {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          rejects();
        } else {
          resolve({
            publicKey,
            privateKey,
          });
        }
      }
    );
  });
};
