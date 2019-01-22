//const bcryptjs = require('bcryptjs');
var Validaregistro = function() {
    var apaterno = document.getElementById("apaterno").value;
    var amaterno = document.getElementById("amaterno").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    //console.log(encrip);
    //var password = encriptar(document.getElementById("password").value);
    alert(apaterno + amaterno + nombre + email + username /*+ password*/ );
}