function renderConnectedFriends(peopleConnected){
  var navAmigos = $('#navAmigos');
  //Hacer promesa de ajax
  var yo = $("#mySelf").val();
  var html5 = '';
  navAmigos.html(html5);
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
                  html5 += `<a id="${datosAmigo[0].username}" href="#" onclick=unirseASala("${datosAmigo[0].username}"); "return false;" style="display: none;">Aceptar Invitacion</a>`;
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
}
