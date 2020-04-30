var socket = io();
var divNotification = $('#Notifications');


function top7(){
  let actualTop7 = getTop7();
  actualTop7.then((response) => {
      if(response){
        if ( $("#top7-table").length ) {
          var table = $("#top7-table");
          var length = response.length;
          for(var i=0; i<length; i++){
            var foto = "imagenes/user.jpg";
            var medalla="";
            if (response[i].foto) {
              foto = response[i].foto;
            }
            if(i==0){
              medalla='oro';
            }
            if(i==1){
              medalla='plata';
            }
            if(i==2){
              medalla='bronce';
            }


            table.append(
              `<table id="table_id" class='table table-bordered table-striped table-hover display'>
              <thead class='bonita'>
                <tr class='bonita'>
                <th class='text-center'>Pos</th>
                  <th class='text-center'>${response[i].username}</th>
                  <th class='text-center'>Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr class='bonita'>
                  <th class="${medalla}">
                  <h1 class='text-center'>${i+1}</h1>
                  </th>
                  <th>
                    <div class="row">
                      <div class="col">
                      </div>
                      <div class="col">
                      <img class='foto-top7 d-flex justify-content-center' src='${foto}' alt='No hay foto disponible'>
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </th>
                  <th>
                    <h2 class='text-center'>${response[i].monedas}</h2>
                  </th>
                </tr>
              </tbody>
              </table>`
            );
          }
      }
      }else {
        console.log("Error consulta ajax");
      }
    });
}

function getTop7(){
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/top7',
      success: function(top7) {
        resolve(top7);
      },
      error: function(error) {
        showNotification("Hubo un error en el sistema","r");
        console.log(error);
        resolve(false);
      }
    });
  });
}

socket.on('top7', function(message) {
  console.log(message);
  top7();
});

socket.on('connect', function() {
    console.log('Conectado al servidor');
    let userConnected = WhoAmI();
         userConnected.then((response) => {
             if(response){
               top7();
               socket.emit('conectarse', response, function(personas) {
                 if(personas){
                   renderConnectedFriends(personas);
                 }else {
                   showNotification("Fallo algo","r");
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
  if ( $("#estoyEnSala").length > 0 ) {
    renderRoom(personas);
  }
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
  showNotification("mensaje","b");
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
      showNotification(message,"g");
    }else {
      showNotification("Crea o unete a una sala primero","b");
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
      showNotification(message,"g");
      socket.emit('personasSala', amigo, function(personas) {
        if(personas){
          renderRoom(personas);
        }else {
          showNotification("Fallo algo en las personas de la sala","r");
        }
      });
    }else {
      showNotification("No hay respuesta","r");
    }
  });
}

socket.on('recibeInvitation', function(mensaje) {
  var invitacion = "#"+mensaje;
  $(invitacion).css("display", "inline");
  //alert("Recibiste una invitacion de "+mensaje);
  showNotification("Recibiste una invitacion de "+mensaje,"b");
});

socket.on('hostAbandona', function(mensaje) {
  showNotification("El host abandonó la sala","r");
  location.reload();
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
