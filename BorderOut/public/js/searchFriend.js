
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
              html5 += `<table id="table_id" class='table table-bordered table-striped table-hover display'>
              <thead class='bonita'>
                <tr class='bonita'>
                  <th class='text-center'>Usuario</th>
                  <th class='text-center'></th>
                </tr>
              </thead>
              <tbody>`;
              for (var i = 0; i < data.length; i++)
              {
                html5 += `<tr class='bonita'>
                  <td class='bonita text-center'>${data[i].username}</td>
                  <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${data[i].username}" id="agregar">Agregar</button></td>
                </tr>`;
              }
              html5 +=`</tbody>
                </table>`;
              divTabla.html(html5);
              $('#table_id').DataTable();
            }
            else
            {
                showNotification("Algo esta mal","r");
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
          showNotification("No puedes mandarte solicitud a ti mismo","r");
        }
        else if(data=="Already")
        {
          showNotification("El usuario ya es tu amigo o ya enviste una solicitud","b");
        }
        else if(data=="Done")
        {
          showNotification("Solicitud enviada","g");
        }
        else
        {
          showNotification("Algo fallo","r");
        }
      }
    });

});
