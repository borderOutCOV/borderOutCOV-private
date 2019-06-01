

function MostrarDatos() {
  var html5 = '';
  $.ajax({
      url: '/getUserData',
      success: function(data)
      {
          if (data != undefined)
          {
              //$("#username").val(data[0].username);
              $("#nombre").val(data[0].nombre);
              $("#paterno").val(data[0].paterno);
              $("#materno").val(data[0].materno);
          }
          else
          {
              alert("Algo esta mal");
          }


      }
  })
}
MostrarDatos();
