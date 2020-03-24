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

function validarQueja()
{
  var queja = $("#queja").val();

  if(invalida(queja))
  {
    document.getElementById("mensajeCaracterInvalido").style.visibility = "visible";
    return false;
  }

  return true;
}
function validarLogin()
{
  var email = $("#emaillog").val();
  var password = $("#passwordlog").val();
  if(invalida(email))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(invalida(password))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  return true;
}
function validar_email( email ) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
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
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(invalida(materno))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(validar_email(email))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(invalida(nombre))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(invalida(username))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  else if(invalida(password))
  {
    showNotification("Estas usando un simbolo invalido","r");
    return false;
  }
  return true;
}
