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
    html5 += "<input id='lugar' value = '0' type='hidden'>";
    divSalaEspera.html(html5);
    estoyJugando(divIdSala);
  }
});




socket.on('recibirSolicitud', function(mensaje) {
  alert(mensaje);
  document.getElementById("solicitudes").style.color = 'blue';
});
socket.on('terminarJuego', function(lugar) {
  $("#lugar").val(lugar);
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
  var invitacion = "#"+amigo;
  $(invitacion).css("display", "none");
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
  var porcentajeActual = $("#porcentaje"+usuario+"").val();
  console.log(porcentajeActual);
  porcentajeActual = parseInt(porcentajeActual);
  porcentajeActual += 5;
  var barra = $("#barra"+usuario+"");
  var html5 = "<input type='hidden' id='porcentaje"+usuario+"' value='"+porcentajeActual+"'>";
  html5 += `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeActual}%;">${porcentajeActual}%</div>`;
  barra.html(html5);
  console.log("Aca estoy");
  console.log(barra);
});
socket.on('estoyJugando', function(usuario) {
  var divActual = $('#jugadoresJugando');
  var html5 = divActual.html();
  html5 += "<h3>" +usuario+"</h3>";
  html5 += "<div class='progress mb-3' style='height:30px;' id='barra"+usuario+"'>";
  html5 += "<input type='hidden' id='porcentaje"+usuario+"' value='0'>";
  html5 += "<div class='progress-bar progress-bar-striped progress-bar-animated bg-info' role='progressbar' style='width:1%;'>0%</div>";
  html5 += "</div> <hr>";
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
      html5 +=
          `<div class="container">
                  <div class="row">
                    <div class="col col-lg-6 col-sm-12">
                      <select class="form-control" id="seleccionarCategoria"></select>
                    </div>
                  </div>
                </div>
                <br>`;
      html5 += '<button class= "btn btn-success btn-md btn-block " onClick="escogerCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Escoger Categoria</button>';
      divSalaEspera.html(html5);
      renderCategoria(categorias);
    }
  });
});
