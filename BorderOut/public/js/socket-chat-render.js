function waitRoomHtml(sala){
  var divActual = $('#htmlToChange');
  var html5 = '';
  html5 += "<h3 class='titulo'>Sala de espera</h3>";
  html5 += `<input id='sala' value = '${sala}' type='hidden'>`;
  html5 += `<div id='renderSalaDeEspera'></div>`;
  divActual.html(html5);

  var divSalaEspera = $('#renderSalaDeEspera');
  var divIdSala = $('#sala').val();
  var html5 = '';
  html5 += "<h4 class='titulo'>Gente conectada</h4>"
  divSalaEspera.html(html5);
}

function  renderRoom(personas) {
  var divSalaEspera = $('#renderSalaDeEspera');
  var html5 = divSalaEspera.html();
  for (var i = 0; i < personas.length; i++) {
    persona = personas[i];
    html5 += `<h5>'${persona.nombre}'</h5>`;
  }
  divSalaEspera.html(html5);
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
                             html5 += `<a href="#" onclick= mensajePrueba();return false;">Mensaje de prueba</a>`;
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
