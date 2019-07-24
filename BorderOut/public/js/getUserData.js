

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
              $("#imagen").attr("src",data[0].foto);
          }
          else
          {
              alert("Algo esta mal");
          }
      }
  })
}
MostrarDatos();

function validar(){
  var nombre = $("#nombre").val();
  var paterno = $("#paterno").val();
  var materno = $("#materno").val();
  var contra = $("#contra").val();
  var contra2 = $("#contra2").val();

  if(invalida(nombre))
  {
    document.getElementById("mensajeCaracterInvalidoNombre").style.visibility = "visible";
    return false;
  }
  else if(invalida(paterno))
  {
    document.getElementById("mensajeCaracterInvalidoPaterno").style.visibility = "visible";
    return false;
  }
  else if(invalida(materno))
  {
    document.getElementById("mensajeCaracterInvalidoMaterno").style.visibility = "visible";
    return false;
  }
  else if(invalida(contra))
  {
    document.getElementById("mensajeCaracterInvalidoContra").style.visibility = "visible";
    return false;
  }
  else if(invalida(contra2))
  {
    document.getElementById("mensajeCaracterInvalidoContra2").style.visibility = "visible";
    return false;
  }

  return true;
}
