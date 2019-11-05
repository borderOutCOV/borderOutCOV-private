var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
    let userConnected = WhoAmI();
         userConnected.then((response) => {
             if(response){
               $('#createRoom').click(function() {
                 socket.emit('crearSala', response, function(message) {
                   console.log(message);
                   waitRoomHtml(response);
                   let room = response;
                   socket.emit('personasSala', room, function(personas) {
                     if(personas){
                       console.log(personas);
                     }else {
                       alert("Fallo algo en las personas de la sala");
                     }
                   });

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

socket.on('usuariosConectadosSala', function(personas) {
  var divSalaEspera = $('#renderSalaDeEspera');
  console.log("Estoy aqui esperando a ver si funciona");
  if(divSalaEspera){
    //alert("Habitacion");
  }else {
    //alert("No habitacion");
  }
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
  waitRoomHtml(amigo);
  let unirse = {
    yo : yo,
    amigo: amigo
  };
  socket.emit('unirseSala',unirse, function(message) {
    if(message){
      alert(message);
      socket.emit('personasSala', amigo, function(personas) {
        if(personas){
          console.log(personas);
        }else {
          alert("Fallo algo en las personas de la sala");
        }
      });
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
