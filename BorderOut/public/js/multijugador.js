var palabrasSwap = [];
var divPrincipal = $('.principal');
var traduciendo = $('#traduciendo');
var answer = $('#answer');
var verificaRespuesta = $("#verificaRespuesta");
var reproducirAudio = $("#reproducirAudio");

var restantes = $('#restantes');
var barra = $('#barra');
var equibocacion = $("#equibocacion");
var porcentajeBarra = 0;
var indice = 0;
var bandera = false;
var divFinal = $("#divFinal");
var palabrasEliminadas = [];


function recargar(){
  location.reload();
}
function asignarPalabras(palabrasJugar){
  palabrasSwap = palabrasJugar;
  indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
  html = `Traduce ${palabrasSwap[indice].espanol}`;
  responsiveVoice.speak(palabrasSwap[indice].ingles);
  traduciendo.html(html);
  html = "";
  equibocacion.html(html);
}

verificaRespuesta.on('click', verificando);
reproducirAudio.on('click', reproducir);

function terminarJuego(e){
  var monedas = 3;
  porcentajeBarra += 5;
  var html5 = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
  barra.html(html5);
  html5 = `<h1 class="text-center">Resumen</h1>
          <hr>
          <h2>Has ganado 3 monedas por terminar esta ronda</h2>
          <hr>`;
  var lugarActual = $("#lugar").val();
  lugarActual = parseInt(lugarActual);
  lugarActual += 1;
  if(lugarActual==1){
    html5 += "<h2>Has ganado 5 monedas por terminar primero</h2> <hr>";
    monedas += 5;
  }else if(lugarActual==2){
    html5 += "<h2>Has ganado 3 monedas por terminar segundo </h2> <hr>";
    monedas += 3;
  }else {
    html5 += "<h2>Has ganado 1 monedas por terminar en "+lugarActual+" lugar  </h2> <hr>";
    monedas += 1;
  }
  html5 += ` <hr> <h2 class="text-center">Monedas totales = ${monedas}</h2> <hr>`;
  html5 += '<button class= "btn btn-success btn-md btn-block " onClick="recargar();" >Regresar</button>';
  divFinal.html(html5)
  e.preventDefault();

  var divIdSala = $('#sala').val();
  let datos = {
    sala : divIdSala,
    resultado: lugarActual
  };
  socket.emit('terminarJuego', datos, function(mensaje) {
    if(!mensaje){
      console.log("Error mortal");
    }
  });

  $.ajax({
      url: '/setMonedas',
      method: 'POST',
      data: {
          monedas
      },
      success: function() {
          console.log("exito");
      }
  });
}

answer.keypress(function(e) {
    if (e.which == 13) {
        verificando(e);
    }
});

function emitirIncrementoContador(){
  let userConnected = WhoAmI();
  userConnected.then((response) => {
      if(response){
        var divIdSala = $('#sala').val();
        let datos = {
          sala : divIdSala,
          usuario: response
        };
        socket.emit('aumentarContador', datos, function(mensaje) {
          if(!mensaje){
            console.log("Error mortal");
          }
        });
      }else {
        console.log("Error consulta ajax");
      }
    });
}
function reproducir(e) {
    responsiveVoice.speak(palabrasSwap[indice].ingles);
}

function verificando(e) {
    if (bandera) {
        if (palabrasSwap.length == 0) {
            alert("Terminaste el juego");
        } else {
            answer = document.getElementById("answer");
            if (String(answer.value.toLowerCase()) == String(palabrasSwap[indice].ingles.toLowerCase())) {
                answer.value = "";
                if (palabrasSwap[indice].contador - 1 == 0 && !palabrasSwap[indice].equibocacion) {
                    palabrasEliminadas.push(palabrasSwap[indice]);
                }
                palabrasSwap.splice(indice, 1);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Palabras restantes ${palabrasSwap.length}`;
                restantes.html(html);
                if (palabrasSwap.length > 0) {
                    porcentajeBarra += 5;
                    html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                    barra.html(html);
                    html = `Traduce ${palabrasSwap[indice].espanol}`
                    traduciendo.html(html);
                    html = "";
                    equibocacion.html(html);
                    responsiveVoice.speak(palabrasSwap[indice].ingles);
                    emitirIncrementoContador();
                  } else {
                    emitirIncrementoContador();
                    terminarJuego(e);
                  }
            } else {
                answer.value = "";
                palabrasSwap[indice].equibocacion = true;
                html = `La respuesta correcta de "${palabrasSwap[indice].espanol}" es "${palabrasSwap[indice].ingles}"`;
                equibocacion.html(html);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Traduce ${palabrasSwap[indice].espanol}`
                traduciendo.html(html);
                responsiveVoice.speak(palabrasSwap[indice].ingles);
            }
        }
    } else {
        bandera = true;
    }
}
