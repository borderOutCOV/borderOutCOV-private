function validarAgregarPalabra(){
  var nombre = $("#pespanol").val();
  var paterno = $("#pingles").val();

  if(invalida(nombre))
  {
    document.getElementById("mensajeCaracterInvalidoEspanol").style.visibility = "visible";
    return false;
  }
  else if(invalida(paterno))
  {
    document.getElementById("mensajeCaracterInvalidoIngles").style.visibility = "visible";
    return false;
  }


  return true;
}
