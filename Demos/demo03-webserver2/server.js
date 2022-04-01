const http = require('http');
const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs');
const { URL, URLSearchParams } = require('url');
const ejs = require('ejs');
const qstr = require('query-string');
const { captureRejectionSymbol } = require('events');

// liste produits
let products = [
  {
    id: 1,
    name: 't-shirt',
    price: 14.5,
    description: 'my Little-Poney gay mais pas trop',
  },
  {
    id: 2,
    name: 'pull',
    price: 28,
    description: 'brun caca epoustouflant avec des pailletes qui volent',
  },
  {
    id: 3,
    name: 'robe',
    price: 42,
    description: 'pute mais élégante avec rondeur sur les bas cotés',
  },
  {
    id: 4,
    name: 'chemise',
    price: 20,
    description: 'a carreau sans manche extra fit sur mesure mais pas cher',
  },
];
// Exo
// product : affiche une page de la liste produit
// product/id : affiche une page avec le détail du product

const sendServerResponse = (response, pageName, data = {}, code = 200) => {
  const filename = path.resolve(__dirname, 'views', 'pages', pageName + '.ejs');
  ejs.renderFile(filename, data, (error, pageRender) => {
    if (error) {
      response.writeHead(500);
      response.end();
      return;
    }
    response.writeHead(code, { 'Content-Type': 'text/html' });
    response.write(pageRender);
    response.end();
  });
};

const publicFileExist = (targetFile) => {
  const filename = path.resolve(__dirname, 'public' + targetFile);
  if (fs.existsSync(filename)) {
    return fs.statSync(filename).isFile();
  }
  return false;
};

const sendFile = (response, targetFile) => {
  const filename = path.resolve(__dirname, 'public' + targetFile);

  fs.readFile(filename, (error, data) => {
    response.writeHead(200);
    response.end(data, 'utf-8');
  });
};

const getBodyData = (request) => {
  if (request.method !== 'POST') {
    return Promise.resolve(null);
    // return new Promise((resolve) => resolve(null));
  }

  return new Promise((resolve) => {
    let body = '';
    request.on('data', (postData) => {
      body += postData.toString('utf8');
    });
    request.on('end', () => {
      const result = qstr.parse(body);
      resolve(result);
      console.log(result);
    });
  });
};

// CREATION SERVER

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://' + request.headers.host);
  // dossier public
  const test = url.pathname;
  console.log(test);
  if (publicFileExist(url.pathname)) {
    sendFile(response, url.pathname);
  }
  // dossier pages
  // Home
  else if (/^\/(home\/?)?$/i.test(url.pathname)) {
    // else if(url.pathname ==='/' || url.pathname ==='/home'){
    const now = new Date();
    const today = now.toLocaleDateString('fr-be');
    sendServerResponse(response, 'home/index', { today });
  }
  // About
  else if (
    request.method === 'GET' &&
    url.pathname.toLocaleLowerCase() === '/about'
  ) {
    sendServerResponse(response, 'home/about');
  }
  // Contact
  else if (
    request.method === 'GET' &&
    url.pathname.toLocaleLowerCase() === '/contact'
  ) {
    sendServerResponse(response, 'contact/index');
  }
  // Contact -- reponse
  else if (
    request.method === 'POST' &&
    url.pathname.toLowerCase() === '/contact'
  ) {
    getBodyData(request).then((data) => {
      sendServerResponse(response, 'contact/response', { username: data.name });
    });
  }
  // products
  else if (
    request.method === 'GET' &&
    url.pathname.toLowerCase() === '/product'
  ) {
    sendServerResponse(response, 'product/index', {
      nbProducts: products.length,
      products,
    });
  } else if (
    request.method === 'GET' &&
    /^\/product\/[0-9]+$/i.test(url.pathname)
  ) {
    const urlPart = url.pathname.split('/');
    const productId = parseInt(urlPart[urlPart.length - 1]);
    const product = products.find((p) => p.id === productId);
    if (product) {
      const priceEuro = product.price.toLocaleString('fr-BE', {
        style: 'currency',
        currency: 'EUR',
      });
      sendServerResponse(response, 'product/detail', {
        product,
        priceEuro,
      });
    } else {
      sendServerResponse(
        response,
        'product/notfound',
        { productId },
        (code = 404)
      );
    }
  }
  // erreur
  else {
    sendServerResponse(response, 'error/404', (code = 404));
  }
});

server.listen(1480, () => {
  console.log('server start : 1480');
});
