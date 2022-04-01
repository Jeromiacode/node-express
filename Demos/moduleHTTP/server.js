// importer le module HTTP
// import { createServer } from 'http'
const http = require('http')
// console.log(http);


const server = http.createServer((request, response) => {

  console.log(request.url);
  // console.log(response);
  response.writeHead(200, { "Content-Type" : "text/html;charset=utf-8" })
  response.write("☺")
  response.end()

})

server.listen(8080, () => console.log("Mon serveur écoute le port : 8080"))