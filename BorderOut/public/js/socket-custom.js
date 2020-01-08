var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
    let userConnected = WhoAmI();
         userConnected.then((response) => {
             if(response){
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

socket.on('recibirPalabras', function(palabras) {
  console.log(palabras);
  asignarPalabras(palabras);
});

socket.on('usuariosConectadosSala', function(personas) {
  renderRoom(personas);
});
socket.on('escogerCategorias', function(mensaje) {
  if(mensaje=="Llena"){
    var divIdSala = $('#sala').val();
    var divSalaEspera = $('#renderSalaDeEspera');
    var html5 = '';
    html5 += "<h4 class='titulo'>Juego</h4>";
    html5 += htmlJuego;
    divSalaEspera.html(html5);
    estoyJugando(divIdSala);
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
          renderRoom(personas);
        }else {
          alert("Fallo algo en las personas de la sala");
        }
      });
    }else {
      alert("No hay respuesta");
    }
  });
}

socket.on('recibeInvitation', function(mensaje) {
  var invitacion = "#"+mensaje;
  $(invitacion).css("display", "inline");
  alert("Recibiste una invitacion de "+mensaje);
});

socket.on('aumentarContador', function(usuario) {
  var divContador = $('#contador'+usuario+'');
  console.log("El usuario "+usuario+" agrega 1");
});
socket.on('estoyJugando', function(usuario) {
  var divActual = $('#jugadoresJugando');
  var html5 = divActual.html();
  html5 += "<h3>" +usuario+"</h3>";
  html5 += "<h3 id= 'contador"+usuario+"'>0</h3>";
  divActual.html(html5);
});

socket.on('renderizarCategorias', function(mensaje) {
  $.ajax({
    url: '/dameCategorias',
    success: function(categorias)
    {
      var divSalaEspera = $('#renderSalaDeEspera');
      var html5 = '';
      html5 += "<h3 class='titulo'>Escoge una categoria</h3>";
      html5 += '<select id="seleccionarCategoria"></select> ';
      html5 += '<button class= "btn btn-success btn-md btn-block " onClick="escogerCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Escoger Categoria</button>';
      divSalaEspera.html(html5);
      renderCategoria(categorias);
    }
  });
});
