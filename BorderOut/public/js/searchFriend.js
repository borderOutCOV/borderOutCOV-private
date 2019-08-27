
var divTabla = $('#tabla');

$(document).ready(function()
{
  fieldListener();
});

function fieldListener()
{
  if(document.getElementById("amigo")){
    document.getElementById("amigo").addEventListener('change', getFieldValue, false);
  }
}
function getFieldValue (evt)
{
  var html5 = '';
  var cadena = $('#amigo').val();
  if(invalida(cadena))
  {
    document.getElementById("mensajeCaracterInvalido").style.visibility = "visible";
  }
  else
  {
    document.getElementById("mensajeCaracterInvalido").style.visibility = "hidden";
    $.ajax({
        url: '/searchFriend/'+$('#amigo').val(),
        success: function(data)
        {
            if (data != undefined)
            {
              html5 += `<table class='table table-bordered table-striped table-hover '>
              <thead class='bonita'>
                <tr class='bonita'>
                  <th class='text-center'>Usuario</th>
                  <th class='text-center'></th>
                </tr>
              </thead>`;
              for (var i = 0; i < data.length; i++)
              {
                html5 += `<tr class='bonita'>
                  <td class='bonita text-center'>${data[i].username}</td>
                  <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${data[i].username}" id="agregar">Agregar</button></td>
                </tr>`;
              }
              divTabla.html(html5);
            }
            else
            {
                alert("Algo esta mal");
            }
        }
    })

  }
}

$(document).on('click', '#agregar', function() {
    var datos = $(this).data("elemento");
    $.ajax({
      url: '/sendFriendRequest/'+datos,
      success: function(data)
      {
        if(data=="Same")
        {
          alert("No puedes mandarte solicitud a ti mismo");
        }
        else if(data=="Already")
        {
          alert("El usuario ya es tu amigo o ya enviste una solicitud");
        }
        else if(data=="Done")
        {
          alert("Solicitud enviada");
        }
        else
        {
          alert("Algo fallo");
        }
      }
    });

});
