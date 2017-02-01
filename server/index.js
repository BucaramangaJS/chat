const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(process.cwd() + '/public'));

//
// Eventos de sockets
//

io.on('connection', function (socket) {
  console.log('Usuario conectado.');

  socket.on('disconnect', function () {
    console.log('Usuario desconectado.');
  });

  // Al recibir un mensaje de un usuario, reenviarlo a todos los demás.
  socket.on('new:message', function (data) {
    console.log('Nuevo mensaje: Usuario="' + data.username + '", Contenido="' + data.value + '".');
    socket.broadcast.emit('new:message', data);
  });
});

server.listen(4000, function (err) {
  if (err) throw err;
  console.log('Server running at http://127.0.0.1:4000');
});
