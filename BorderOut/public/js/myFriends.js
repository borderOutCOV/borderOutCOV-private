var divTabla = $('#tabla');

$(document).ready(function()
{
  showMyFriends();
});


function showMyFriends ()
{
  var html5 = '';

  $.ajax({
      url: '/user',
      success: function(data)
      {
          if (data != undefined)
          {
            var user = data;
            $.ajax({
                url: '/getMyFriends',
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
                        if(data[i].amigo1==user)
                        {
                          html5 += `<tr class='bonita'>
                            <td class='bonita text-center'>${data[i].amigo2}</td>
                            <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${data[i].amigo2}" id="eliminar">Eliminar</button></td>
                          </tr>`;
                        }
                        else
                        {
                          html5 += `<tr class='bonita'>
                            <td class='bonita text-center'>${data[i].amigo1}</td>
                            <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${data[i].amigo1}" id="eliminar">Eliminar</button></td>
                          </tr>`;
                        }
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
          else
          {
            showNotification("Algo esta mal","r");
          }
      }
  });
}

$(document).on('click', '#eliminar', function() {
    var datos = $(this).data("elemento");
    $.ajax({
      url: '/deleteFriend/'+datos,
      success: function(data)
      {
        if(data=="Done")
        {
          location.reload();
        }
        else
        {
          showNotification("Algo fallo","r");
        }
      }
    });

});
