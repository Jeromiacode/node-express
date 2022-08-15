const express = require('express');
const cors = require('cors');
const http = require('http');

// Server Express
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    message: 'Demo de l\'utilisation de Socket IO'
  });
});
const server = http.createServer(app);

// Server WebSocket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  const userToken = socket.handshake.auth.token;

  // Info de connection et déconnection dans la console serveur
  console.log('User connected -> ', userToken);
  socket.on('disconnect', () => {
    console.log('User disconnected -> ', userToken);
  });

  // Réaction a la reception de message
  socket.on('message', (msg) => {
    console.log('New Message: ', userToken, msg);

    // ↓ Envoi vers tout les client connecté
    // io.emit('message', `${userToken}: ${msg}`);

    // ↓ Envoi vers tout les client sauf l'emetteur
    socket.broadcast.emit('message', `${userToken}: ${msg}`);

    // ↓ Envoi vers uniquement l'emetteur
    socket.emit('message', `Moi: ${msg}`);
  });

  // Mecanisme des groupes
  socket.on('groupJoin', (group) => {
    console.log('Join Group: ', group, userToken);
    socket.join(group);

    // ↓ Envoi vers tout les client du group sauf l'emetteur
    socket.broadcast.to(group).emit('message', `[${group}] ${userToken} a rejoint le groupe`);
  });

  socket.on('groupLeave', (group) => {
    console.log('Leave Group: ', group, userToken);
    socket.leave(group);

    // ↓ Envoi vers tout les client du group sauf l'emetteur
    socket.broadcast.to(group).emit('message', `[${group}] ${userToken} est parti :(`);
  });

  socket.on('groupMessage', (group, msg) => {
    console.log('New Group Message: ', group, msg);

    // ↓ Envoi vers tout les client connecté au groupe (emetteur compris)
    // io.to(group).emit('message', `[${group}] ${userToken}: ${msg}`);

    // ↓ Envoi vers tout les client du group sauf l'emetteur
    socket.broadcast.to(group).emit('message', `[${group}] ${userToken}: ${msg}`);

    // ↓ Envoi vers uniquement l'emetteur (Pas de lien avec le groupe)
    socket.emit('message', `[${group}] Moi: ${msg}`);

  });
});

// Start App
server.listen(4224, () => {
  console.log('listening on port 4224');
});