var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
    //Hacer otra promesa de ajax.
    console.log("Esperando promesa");
    let userConnected = WhoAmI();
         userConnected.then((response) => {
             if(response){
               $('#createRoom').click(function() {
                 socket.emit('crearSala', response, function(message) {
                   console.log(message);
                   waitRoomHtml();
                 });
               });
               socket.emit('conectarse', response, function(personas) {
                 if(personas){
                   renderConnectedFriends(personas);
                 }else {
                   alert("Fallo algo");
                 }
               });
             }else {
               console.log("Error consulta ajax");
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
  var invitacion = {
    origen: yo,
    destino: amigo
  };
  socket.emit('sendRoomInvitation',invitacion, function(message) {
    if(message){
      alert(message);
    }else {
      alert("Crea o unete a una sala primero")
    }
  });
}

function unirseASala(amigo,yo){
  waitRoomHtml();
  let unirse = {
    yo : yo,
    amigo: amigo
  };
  socket.emit('unirseSala',unirse, function(message) {
    if(message){
      alert(message);
    }else {
      alert("No hay respuesta");
    }
  });
}

function mensajePrueba(){
  amigo = "a";
  console.log("Si estoy entrando");
  socket.emit('test', amigo, function(message) {});
}

socket.on('test', function(mensaje) {
  alert(mensaje);
});


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
