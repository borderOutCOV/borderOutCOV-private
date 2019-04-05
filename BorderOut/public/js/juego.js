var palabrasSwap = [];
var divPrincipal = $('.principal');
var traduciendo = $('#traduciendo');
var answer = $('#answer');
var verificaRespuesta = $("#verificaRespuesta");
var restantes = $('#restantes');
var barra = $('#barra');
var equibocacion = $("#equibocacion");
var porcentajeBarra = 0;
var indice = 0;
var bandera = false;
async function getPalabras() {
    await $.ajax({
        url: '/getPalabrasPractica',
        success: function(palabras) {
            for (var i = 0; i < palabras.length; i++) {
                nuevoelemento = {
                    ingles: palabras[i].ingles,
                    espanol: palabras[i].espanol,
                    contador: palabras[i].contador,
                    id: palabras[i].id,
                    tipo: "normal"
                }
                palabrasSwap.push(nuevoelemento);
            }
        }
    });
    await $.ajax({
        url: '/getPalabrasPracticaUsuario',
        success: function(palabras) {
            for (var i = 0; i < palabras.length; i++) {
                nuevoelemento = {
                    ingles: palabras[i].ingles,
                    espanol: palabras[i].espanol,
                    contador: palabras[i].contador,
                    id: palabras[i].IdPalabra,
                    tipo: "agregada"
                }

                palabrasSwap.push(nuevoelemento);
            }
            if (palabrasSwap.length < 21) {
                var insuficiente = `<h2>No tienes suficientes palabras para jugar, te hacen falta al menos ${20-palabrasSwap.length} palabras, ve a "ampliar vocabulario" o "mis palabras-> agregar palabras" para conseguir algunas</h2>`;
                divPrincipal.html(insuficiente);
            }
            while (palabrasSwap.length > 20) {
                var indiceEliminado = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                palabrasSwap.splice(indiceEliminado, 1);
            }
            indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
            html = `Traduce ${palabrasSwap[indice].espanol}`;
            traduciendo.html(html);
            html = "";
            equibocacion.html(html);

        }
    })
}
getPalabras();
verificaRespuesta.on('click', verificando);

answer.keypress(function(e) {
    if (e.which == 13) {
        verificando();
    }
});

function verificando() {
    if (bandera) {
        if (palabrasSwap.length == 0) {
            alert("Felicidades ganaste");
        } else {
            answer = document.getElementById("answer");
            if (String(answer.value.toLowerCase()) == String(palabrasSwap[indice].ingles.toLowerCase())) {

                answer.value = "";
                palabrasSwap.splice(indice, 1);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Palabras restantes ${palabrasSwap.length}`;
                restantes.html(html);
                porcentajeBarra += 5;
                html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                barra.html(html);
                html = `Traduce ${palabrasSwap[indice].espanol}`
                traduciendo.html(html);
                html = "";
                equibocacion.html(html);
            } else {
                answer.value = "";
                html = `La respuesta correcta de "${palabrasSwap[indice].espanol}" es "${palabrasSwap[indice].ingles}"`;
                equibocacion.html(html);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Traduce ${palabrasSwap[indice].espanol}`
                traduciendo.html(html);
            }
        }
    } else {
        bandera = true;
    }
}