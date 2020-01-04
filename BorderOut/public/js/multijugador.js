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
function asignarPalabras(palabrasJugar){

  palabrasSwap = palabrasJugar;
  indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
  html = `Traduce ${palabrasSwap[indice][0].espanol}`;
  responsiveVoice.speak(palabrasSwap[indice][0].ingles);
  traduciendo.html(html);
  html = "";
  equibocacion.html(html);

}


//getPalabras();
verificaRespuesta.on('click', verificando);
reproducirAudio.on('click', reproducir);



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
    responsiveVoice.speak(palabrasSwap[indice][0].ingles);
}

function verificando(e) {
    if (bandera) {
        if (palabrasSwap.length == 0) {
            alert("Felicidades ganaste");
        } else {
            answer = document.getElementById("answer");
            if (String(answer.value.toLowerCase()) == String(palabrasSwap[indice][0].ingles.toLowerCase())) {
                answer.value = "";
                if (palabrasSwap[indice][0].contador - 1 == 0 && !palabrasSwap[indice][0].equibocacion) {
                    palabrasEliminadas.push(palabrasSwap[indice][0]);
                }
                palabrasSwap.splice(indice, 1);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Palabras restantes ${palabrasSwap.length}`;
                restantes.html(html);
                if (palabrasSwap.length != 0) {
                    porcentajeBarra += 5;
                    html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                    barra.html(html);
                    html = `Traduce ${palabrasSwap[indice][0].espanol}`
                    traduciendo.html(html);
                    html = "";
                    equibocacion.html(html);
                    responsiveVoice.speak(palabrasSwap[indice][0].ingles);
                    emitirIncrementoContador();
                  } else {
                    var monedas = 3;
                    porcentajeBarra += 5;
                    html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                    barra.html(html);
                    html = `<h1 class="text-center">Resumen</h1>
                            <hr>
                            <h2>Has ganado 3 monedas por terminar esta ronda</h2>
                            <hr>`;
                    html += ` <hr>
                            <h2 class="text-center">Monedas totales = ${monedas}</h2>`;
                    divFinal.html(html)
                    e.preventDefault();

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
            } else {
                answer.value = "";
                palabrasSwap[indice][0].equibocacion = true;
                html = `La respuesta correcta de "${palabrasSwap[indice][0].espanol}" es "${palabrasSwap[indice][0].ingles}"`;
                equibocacion.html(html);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Traduce ${palabrasSwap[indice][0].espanol}`
                traduciendo.html(html);
                responsiveVoice.speak(palabrasSwap[indice][0].ingles);
            }
        }
    } else {
        bandera = true;
    }
}
