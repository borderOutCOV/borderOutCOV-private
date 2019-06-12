
var divTabla = $('#tabla');

$(document).ready(function()
{
  var html5 = '';
  html5 += `<table class='table table-bordered table-striped table-hover '>
  <thead class='bonita'>
      <tr class='bonita'>
          <th class='text-center'>Usuario</th>
      </tr>
  </thead>`;
  divTabla.html(html5);

  fieldListener();
});

function fieldListener()
{
  document.getElementById("amigo").addEventListener('change', getFieldValue, false);
}
function getFieldValue (evt)
{
  var html5 = '';
  $.ajax({
      url: '/searchFriend/'+$('#amigo').val(),
      success: function(data)
      {
          if (data != undefined)
          {
            console.log(data);
            html5 += `<table class='table table-bordered table-striped table-hover '>
            <thead class='bonita'>
              <tr class='bonita'>
                <th class='text-center'>Usuario</th>
              </tr>
            </thead>`;
            for (var i = 0; i < data.length; i++)
            {
              html5 += `<tr class='bonita'>
                <td class='bonita text-center'>${data[i].username}</td>
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
