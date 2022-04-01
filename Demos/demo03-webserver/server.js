const coucou = { hi: 'Guillaume' };
const coucou2 = { hello: 'Jérôme' };
coucou.hi = coucou2.hello;
console.log(coucou);

const http = require('http');
const { URL, URLSearchParams } = require('url');

const server = http.createServer((request, response) => {
  console.log('requete reçue !');
  console.log(`Info de la requète : ${request.method} ${request.url}`);
  response.writeHead(200, { 'Content-Type': 'text/html' });

  const urlParse = new URL(request.url, `http://${request.headers.host}`);
  const urlInfo = new URLSearchParams(urlParse.searchParams);

  const firstname = urlInfo.get('firstname');
  const age = urlInfo.get('age');

  const data = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  </head>
  <body>
  <h1>Hello World ♥</h1>
  <h3>Prénom: ${firstname}</h3>
  <h3>Age: ${age}</h3>
  </body>
  </html>
  `;

  response.write(data);
  response.end();
});

server.listen(1234, () => {
  console.log('server start');
});
