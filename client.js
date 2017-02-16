(function () {

  //
  // Conexión
  //

  // Crear un nuevo socket.
  const socket = io();

  //
  // Interfaz
  //

  // Se ha recibido un mensaje de otro usuario.
  function addMsg (data) {
    const { username, value } = data;
    $('#list').append(
      `<p><b>${username}</b>: ${value}</p>`
    );
  }

  // Tratar de enviar un nuevo mensaje.
  function sendMsg () {
    const data = {
      username: $('#username').val(),
      value: $('#value').val()
    };

    if (!data.value) return;

    // Enviar mensaje a otros usuarios.
    socket.emit('new:message', data);

    // Agregar el propio mensaje a la interfaz.
    addMsg(data);

    $('#value').val('').focus();
  }

  //
  // Eventos
  //

  // Al recibir un mensaje de otro usuario desde el servidor.
  socket.on('new:message', function (data) {
    addMsg(data);
  });

  // Al hacer click en el botón de enviar.
  $('#send').on('click', function () {
    sendMsg();
  });

  // Al presionar la tecla ENTER.
  $('#value').on('keypress', function (event) {
    if (event.which === 13) {
      sendMsg();
    }
  });

})();
