function renderConnectedFriends(peopleConnected){
  var navAmigos = $('#navAmigos');
  var yo = $("#mySelf").val();
  var html5 = '';
  navAmigos.html(html5);
  $.ajax({
    url: '/getMyFriends',
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
            success: function(amigo)
            {
              for (var i = 0; i < peopleConnected.length; i++) {
                if(amigo[0].username==peopleConnected[i].nombre){
                  var foto = "imagenes/online.png";
                  if(amigo[0].foto){
                    foto = amigo[0].foto;
                  }
                  html5 += `<div><img src="${foto}" class="redondaOnline" alt="Amigo 1" id="status"><span>${amigo[0].username}</span></div>`;
                  html5 += `<input id="amigo:${amigo[0].username}" type="hidden" value="xm234jq">`;
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
