var socket = io();


function crearSalaDeJuego(){
  let userConnected = WhoAmI();
  userConnected.then((response) => {
    socket.emit('crearSala', response, function(message) {
      console.log(message);
      waitRoomHtml(response);
      let room = response;
      socket.emit('personasSala', room, function(personas) {
        if(personas){
          renderRoom(personas);
        }else {
          alert("Fallo algo en las personas de la sala");
        }
      });
    });
  });
}

function estoyJugando(sala){
  let userConnected = WhoAmI();
  userConnected.then((response) => {
      if(response){
        var divIdSala = $('#sala').val();
        let datos = {
          sala : divIdSala,
          usuario: response
        };
        socket.emit('estoyJugando', datos, function(respuestaObtenida) {});
      }else {
        console.log("Error consulta ajax");
      }
    });

}

function damePalabra(categoria){
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/palabrasCategorias/' + categoria,
      success: function(palabras) {
        var date = new Date();
        var miliseconds = date.getMilliseconds();
        var numeroSeleccionado = miliseconds%palabras.length;
        var palabra = palabras[numeroSeleccionado];
        resolve(palabra);
      },
      error: function(error) {
        alert("Hubo un error en el sistema");
        console.log(error);
        resolve(false);
      }
    });
  });

}

function obtenerPalabrasJuegoMultijugador(categorias, contador, contadorCategoria, palabras) {
    return new Promise(function(resolve, reject) {
      if (contadorCategoria >= categorias.length) {
        contadorCategoria = 0;
      }
      var categoriaActual = categorias[contadorCategoria];
      let palabraObtenida = damePalabra(categoriaActual[0]['idCategoria']);
      palabraObtenida.then((palabraInsertar) => {
        palabras.push(palabraInsertar);
        contador += 1;
        contadorCategoria += 1;
      if (contador >= 20) {
        resolve(palabras);
      } else {
        resolve(obtenerPalabrasJuegoMultijugador(categorias, contador, contadorCategoria, palabras));
      }
    });
  });
}

function asignarIdCategorias(categorias, contador, ids) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/dameIdCategoria/' + categorias[contador],
      success: function(id) {
        ids.push(id);
        contador += 1;
        if (contador >= categorias.length) {
          resolve(ids);
        } else {
          resolve(asignarIdCategorias(categorias, contador, ids));
        }
      },
      error: function(error) {
        alert("Hubo un error en el sistema");
        console.log(error);
        resolve(false);
      }
    });
  });
}



function waitRoomHtml(sala) {
  var divActual = $('#htmlToChange');
  var html5 = '';
  html5 += "<h3 class='titulo'>Sala de Juego</h3>";
  html5 += `<input id='sala' value = '${sala}' type='hidden'>`;
  html5 += `<div id='renderSalaDeEspera'></div>`;
  html5 += `<div id='jugadoresJugando'></div>`;
  divActual.html(html5);
}

function escogerCategoria() {
  var categoriaSeleccionada = $("#seleccionarCategoria").val();
  var divIdSala = $('#sala').val();
  let data = {
    divIdSala,
    categoriaSeleccionada
  };
  socket.emit('escogerCategorias', data, function(mensaje) {
    if (!mensaje) {
      alert("Fallo algo en las categorias");
    } else {
      if (mensaje == "Llena") {
        var divSalaEspera = $('#renderSalaDeEspera');
        var html5 = '';
        html5 += "<h4 class='titulo'>Juego</h4>";
        html5 += htmlJuego;

        divSalaEspera.html(html5);
        socket.emit('categoriasEscogidas', divIdSala, function(mensaje) {
          var idsCategorias = [];
          let idsCategoriasObtenidos = asignarIdCategorias(mensaje, 0, idsCategorias);
          idsCategoriasObtenidos.then((response) => {
            var contador = 0;
            var categoriaInicial = 0;
            var palabrasJuegoMultijugador = [];
            let palabrasJuego = obtenerPalabrasJuegoMultijugador(response, contador, categoriaInicial, palabrasJuegoMultijugador);
            palabrasJuego.then((palabrasObtenidas) => {
              var palabras = {
                palabras: palabrasObtenidas,
                idSala: divIdSala
              };
              socket.emit('enviarPalabras', palabras, function(respuestaObtenida) {
                console.log("Aca estoy");
                console.log(respuestaObtenida);
                asignarPalabras(palabrasObtenidas);
              });
            });
          });
          //SELECT * FROM palabra WHERE categoria = 5 ORDER BY RAND() LIMIT 1
        });
      } else {
        var divSalaEspera = $('#renderSalaDeEspera');
        var html5 = '';
        html5 += "<h4 class='titulo'>Esperando a los demas jugadores...</h4>";
        divSalaEspera.html(html5);
      }
    }
  });
}

function renderCategoria(categorias) {
  var divSalaEspera = $('#seleccionarCategoria');
  for (var i = 0; i < categorias.length; i++) {
    $('#seleccionarCategoria').append($('<option/>', {
      value: categorias[i]['nombre'],
      text: categorias[i]['nombre']
    }));
  }
}

function iniciarCategoria() {
  var idSala = $('#sala').val();
  var divSalaEspera = $('#renderSalaDeEspera');
  var html5 = '';
  html5 += "<h3 class='titulo'>Escoge una categoria</h3>";
  html5 += '<select id="seleccionarCategoria"></select> ';
  html5 += '<button class= "btn btn-success btn-md btn-block " onClick="escogerCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Escoger Categoria</button>';
  divSalaEspera.html(html5);
  socket.emit('renderizarCategorias', idSala, function(mensaje) {
    if (mensaje) {
      $.ajax({
        url: '/dameCategorias',
        success: function(categorias) {
          renderCategoria(categorias);
        }
      });
    } else {
      alert("Fallo algo en la transicion a categorias");
    }
  });
}

function renderRoom(personas) {
  var divSalaEspera = $('#renderSalaDeEspera');
  var html5 = '';
  html5 += "<h4 class='titulo'>Gente conectada</h4>"
  divSalaEspera.html(html5);
  for (var i = 0; i < personas.length; i++) {
    persona = personas[i];
    html5 += `<h5>${persona.nombre}</h5>`;
  }
  let userConnected = WhoAmI();
  userConnected.then((yo) => {
    var divIdSala = $('#sala').val();
    if (divIdSala == yo) {
      html5 += '<button class= "btn btn-success btn-md btn-block " onClick="iniciarCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Iniciar Partida</button>';
    }
    divSalaEspera.html(html5);
  });
}

function renderConnectedFriends(peopleConnected) {
  var navAmigos = $('#navAmigos');
  var html5 = '';
  navAmigos.html(html5);
  //Hacer promesa de ajax
  console.log("Esperando promesa");
  let userConnected = WhoAmI();
  userConnected.then((yo) => {
    if (yo) {
      $.ajax({
        url: '/getFriends/' + yo,
        success: function(data) {
          if (data != undefined) {
            for (var i = 0; i < data.length; i++) {
              var amigo = null;
              if (data[i].amigo1 == yo) {
                amigo = data[i].amigo2;
              } else {
                amigo = data[i].amigo1;
              }

              $.ajax({
                url: '/getFriendData/' + amigo,
                success: function(datosAmigo) {
                  for (var i = 0; i < peopleConnected.length; i++) {
                    if (datosAmigo[0].username == peopleConnected[i].nombre) {
                      var foto = "imagenes/online.png";
                      if (datosAmigo[0].foto) {
                        foto = datosAmigo[0].foto;
                      }

                      html5 += `<div class="col-12">
                                    <img src="${foto}" class="redondaOnline" alt="Amigo 1" id="status"><span>${datosAmigo[0].username}</span>`;
                      html5 += `<button type="button" class="btn btn-success buttonAddSala" onclick= sendInvitation("${datosAmigo[0].username}","${yo}");return false;">Invitar a sala</button></div>`;
                      html5 += `<a id="${datosAmigo[0].username}" href="#" onclick=unirseASala("${datosAmigo[0].username}","${yo}"); return false;" style="display: none;">Aceptar Invitacion</a>`;
                      html5 += `<input id="amigo:${datosAmigo[0].username}" type="hidden" value="xm234jq">`;
                      navAmigos.html(html5);
                      break;
                    }
                  }
                }
              });
            }
          } else {
            alert("Algo esta mal");
          }
        }
      });

    } else {
      console.log("Error consulta ajax");
    }
  });
}
