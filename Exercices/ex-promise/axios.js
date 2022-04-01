const http = require('https');

const Axios = function () {};
Axios.prototype.request = function (method, url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, (res) => {
      let str = '';
      res.on('data', (data) => (str += data));
      res.on('end', () => resolve(JSON.parse(str)));
    });
    req.end();
  });
};
Axios.prototype.get = function (url) {
  return this.request('GET', url);
};

module.exports = new Axios();
