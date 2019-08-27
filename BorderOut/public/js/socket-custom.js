var socket = io();


$(document).ready(function() {
    $('#createRoom').click(function() {
      var userConnected = $("#mySelf").val();
      socket.emit('crearSala', userConnected, function(message) {
        console.log(message);
      });

    });
});


socket.on('connect', function() {
    console.log('Conectado al servidor');
    var userConnected = $("#mySelf").val();
    socket.emit('conectarse', userConnected, function(personas) {
      if(personas){
        renderConnectedFriends(personas);
      }
    });

});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('usuariosConectados', function(personas) {
  renderConnectedFriends(personas);
});

socket.on('recibirSolicitud', function(mensaje) {
  alert(mensaje);
  document.getElementById("solicitudes").style.color = 'blue';
});

/*
// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
*/
