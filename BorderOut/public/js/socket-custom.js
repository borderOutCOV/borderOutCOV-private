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

function sendInvitation(amigo,yo){
  url = window.location.href;
  var invitacion = {
    origen: yo,
    destino: amigo
  };
  console.log(url);
  if(url.includes("/room")){
    socket.emit('sendRoomInvitation',invitacion, function(message) {
      if(message){
        alert(message);
      }
    });
  }else {
    alert("Necesitas crear una sala");
  }
  //alert(amigo+" "+yo);
}

socket.on('recibeInvitation', function(mensaje) {
  var invitacion = "#"+mensaje;
  $(invitacion).css("display", "inline");
  alert("Recibiste una invitacion de "+mensaje);
});


/*
// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
*/
