var socket = io();


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

/*
// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
*/
