var socket = io();

function asignarIdCategorias(categorias,contador,ids){
  console.log(categorias[contador]);
  $.ajax({
    url: '/dameIdCategoria/'+categorias[contador],
    success: function(id)
    {
      ids.push(id);
      contador += 1;
      if(contador>=categorias.length){
        return ids;
      }else {
        return asignarIdCategorias(categorias,contador,ids);
      }
    }

  });


}
function waitRoomHtml(sala){
  var divActual = $('#htmlToChange');
  var html5 = '';
  html5 += "<h3 class='titulo'>Sala de espera</h3>";
  html5 += `<input id='sala' value = '${sala}' type='hidden'>`;
  html5 += `<div id='renderSalaDeEspera'></div>`;
  divActual.html(html5);
  //var divSalaEspera = $('#renderSalaDeEspera');
  //var divIdSala = $('#sala').val();
}
function escogerCategoria(){
  var categoriaSeleccionada =$( "#seleccionarCategoria" ).val();
  var divIdSala = $('#sala').val();
  let data = { divIdSala, categoriaSeleccionada};
  socket.emit('escogerCategorias', data, function(mensaje) {
    if(!mensaje){
      alert("Fallo algo en las categorias");
    }else {
      if(mensaje=="Llena"){
        var divSalaEspera = $('#renderSalaDeEspera');
        var html5 = '';
        html5 += "<h4 class='titulo'>Juego</h4>";
        divSalaEspera.html(html5);
        socket.emit('categoriasEscogidas', divIdSala, function(mensaje) {
          var idsCategorias = [];
          let  idsCategoriasObtenidos = asignarIdCategorias(mensaje,0,idsCategorias);
          console.log(idsCategoriasObtenidos);
          //SELECT * FROM palabra WHERE categoria = 5 ORDER BY RAND() LIMIT 1
        });
      }else {
        var divSalaEspera = $('#renderSalaDeEspera');
        var html5 = '';
        html5 += "<h4 class='titulo'>Esperando a los demas jugadores...</h4>";
        divSalaEspera.html(html5);
      }
    }
  });
}

function renderCategoria(categorias){
  var divSalaEspera = $('#seleccionarCategoria');
  for (var i = 0; i < categorias.length; i++) {
    $('#seleccionarCategoria').append($('<option/>', {
       value: categorias[i]['nombre'],
       text : categorias[i]['nombre']
   }));
  }
}
function iniciarCategoria(){
  var idSala = $('#sala').val();
  var divSalaEspera = $('#renderSalaDeEspera');
  var html5 = '';
  html5 += "<h3 class='titulo'>Escoge una categoria</h3>";
  html5 += '<select id="seleccionarCategoria"></select> ';
  html5 += '<button class= "btn btn-success btn-md btn-block " onClick="escogerCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Escoger Categoria</button>';
  html5 += "<h4 class='titulo'>Esperando a los demas jugadores...</h4>";
  divSalaEspera.html(html5);
  socket.emit('renderizarCategorias', idSala, function(mensaje) {
    if(mensaje){
      $.ajax({
        url: '/dameCategorias',
        success: function(categorias)
        {
          renderCategoria(categorias);
        }
      });
    }else {
      alert("Fallo algo en la transicion a categorias");
    }
  });
}

function  renderRoom(personas) {
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
    if(divIdSala==yo){
       html5 += '<button class= "btn btn-success btn-md btn-block " onClick="iniciarCategoria();" id="btn-start-votacion" name="btn-start-votacion" >Iniciar Partida</button>';
    }
    divSalaEspera.html(html5);
  });
}

function renderConnectedFriends(peopleConnected){
  var navAmigos = $('#navAmigos');
  var html5 = '';
  navAmigos.html(html5);
  //Hacer promesa de ajax
  console.log("Esperando promesa");
  let userConnected = WhoAmI();
       userConnected.then((yo) => {
           if(yo){
             $.ajax({
               url: '/getFriends/'+yo,
               success: function(data)
               {
                 if (data != undefined){
                   for (var i = 0; i <data.length; i++) {
                     var amigo = null;
                     if(data[i].amigo1==yo){
                       amigo = data[i].amigo2;
                     }else {
                       amigo = data[i].amigo1;
                     }

                     $.ajax({
                       url: '/getFriendData/'+amigo,
                       success: function(datosAmigo)
                       {
                         for (var i = 0; i < peopleConnected.length; i++) {
                           if(datosAmigo[0].username==peopleConnected[i].nombre){
                             var foto = "imagenes/online.png";
                             if(datosAmigo[0].foto){
                               foto = datosAmigo[0].foto;
                             }

                             html5 += `<div><img src="${foto}" class="redondaOnline" alt="Amigo 1" id="status"><span>${datosAmigo[0].username}</span></div>`;
                             html5 += `<a href="#" onclick= sendInvitation("${datosAmigo[0].username}","${yo}");return false;">Invitar a sala</a>`;
                             html5 += `<a id="${datosAmigo[0].username}" href="#" onclick=unirseASala("${datosAmigo[0].username}","${yo}"); return false;" style="display: none;">Aceptar Invitacion</a>`;
                             html5 += `<input id="amigo:${datosAmigo[0].username}" type="hidden" value="xm234jq">`;
                             navAmigos.html(html5);
                             break;
                           }
                         }
                       }
                     });
                   }
                 }
                 else{
                   alert("Algo esta mal");
                 }
               }
             });

           }else {
             console.log("Error consulta ajax");
           }
       });
}
