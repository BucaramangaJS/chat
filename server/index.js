const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(process.cwd() + '/public'));

server.listen(4000, function (err) {
  if (err) throw err;
  console.log('Server running at http://127.0.0.1:4000');
});

//
// Eventos de sockets
//

// Cuando un socket se conecta.
io.on('connection', function (socket) {

  console.log('Usuario conectado.');

  // Cuando el socket conectado se desconecta.
  socket.on('disconnect', function () {
    console.log('Usuario desconectado.');
  });

  // Al recibir un mensaje de un usuario.
  socket.on('new:message', function (data) {

    const { username, value } = data;
    console.log(
      `Nuevo mensaje: Usuario="${username}", Contenido="${value}".`
    );

    // Reenviarlo a todos los demás.
    socket.broadcast.emit('new:message', data);
  });
});
