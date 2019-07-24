var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
    var userConnected = $("#mySelf").val();

    /*
    // Enviar información
    socket.emit('enviarMensaje', {
        usuario: userConnected,
        mensaje: 'Hola Mundo'
    }, function(resp) {
      console.log('respuesta server: ', resp);
    });*/

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
