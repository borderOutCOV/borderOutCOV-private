var divTabla = $('#tabla');

$(document).ready(function()
{
  showMyRequests();
});


function showMyRequests ()
{
  var html5 = '';
  $.ajax({
      url: '/myRequests',
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
                <td class='bonita text-center'>${data[i].emisor}</td>
                <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${data[i].emisor}" id="agregar">Agregar</button></td>
              </tr>`;
            }
            divTabla.html(html5);
          }
          else
          {
              showNotification("Algo esta mal","r");
          }
      }
  })
}

$(document).on('click', '#agregar', function() {
    var datos = $(this).data("elemento");
    $.ajax({
      url: '/acceptRequest/'+datos,
      success: function(data)
      {
        if(data=="Done")
        {
          showNotification("Solicitud aceptada","g");
          location.reload();
        }
        else
        {
          showNotification("Algo fallo","r");
        }
      }
    });

});
