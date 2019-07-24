var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
    var userConnected = $("#mySelf").val();

    socket.emit('conectarse', userConnected, function(resp) {
      console.log('Usuarios conectados: ', resp);
    });

});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

/*
// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
*/
