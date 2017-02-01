(function () {

  //
  // Conexión
  //

  var socket = io();

  //
  // Interfaz
  //

  var $username = $('#username');
  var $value = $('#value');
  var $send = $('#send');
  var $list = $('#list');

  function addMsg (data) {
    $list.append('<p><b>'+ data.username +'</b>: ' + data.value + '</p>');
  }

  function sendMsg () {
    var data = {
      value: $value.val(),
      username: $username.val()
    };

    if (!data.username) {
      return alert('Escribe un nombre de usuario.');
    }

    if (!data.value) {
      return;
    }

    // Enviar mensaje a otros usuarios
    socket.emit('new:message', data);

    // Agregar el propio mensaje a la lista
    addMsg(data);

    $value.val('');
    $value.focus();
  }

  //
  // Eventos
  //

  socket.on('new:message', function (data) {
    addMsg(data);
  });

  $send.on('click', function () {
    sendMsg();
  });

  $value.on('keypress', function (event) {

    // Al presionar la tecla ENTER.
    if (event.which === 13) {
      sendMsg();
    }
  });

})();
