function invalida(variable)
{
  if(variable.includes(';') || variable.includes("'")||variable.includes('"')||variable.includes("´"))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function validarLogin(){
  var email = $("#emaillog").val();
  var password = $("#passwordlog").val();
  if(invalida(email))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(password))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  return true;
}

function validarRegistro(){
  var paterno = $("#apaterno").val();
  var materno = $("#amaterno").val();
  var nombre =  $("#nombre").val();
  var email = $("#email").val();
  var username =  $("#username").val();
  var password = $("#password").val();

  if(invalida(paterno))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(materno))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(email))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(nombre))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(username))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  else if(invalida(password))
  {
    alert("Estas usando un simbolo invalido");
    return false;
  }
  return true;
}
