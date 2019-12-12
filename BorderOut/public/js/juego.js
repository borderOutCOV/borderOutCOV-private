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
                    tipo: "normal",
                    equibocacion: false
                }
                palabrasSwap.push(nuevoelemento);
            }
        }
    });
    await $.ajax({
        url: '/getPalabrasPracticaUsuario',
        success: function(palabras) {
            try {
                for (var i = 0; i < palabras.length; i++) {
                    nuevoelemento = {
                        ingles: palabras[i].ingles,
                        espanol: palabras[i].espanol,
                        contador: palabras[i].contador,
                        id: palabras[i].IdPalabra,
                        tipo: "agregada",
                        equibocacion: false
                    }

                    palabrasSwap.push(nuevoelemento);
                }
            } catch {

            }
            if (palabrasSwap.length < 20) {
                var insuficiente = `<h2>No tienes suficientes palabras para jugar, te hacen falta al menos ${20-palabrasSwap.length} palabras, ve a "ampliar vocabulario" o "mis palabras-> agregar palabras" para conseguir algunas</h2>`;
                divPrincipal.html(insuficiente);
            }
            while (palabrasSwap.length > 20) {
                var indiceEliminado = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                palabrasSwap.splice(indiceEliminado, 1);
            }
            indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
            html = `Traduce ${palabrasSwap[indice].espanol}`;
            responsiveVoice.speak(palabrasSwap[indice].ingles);
            traduciendo.html(html);
            html = "";
            equibocacion.html(html);

        }
    })
}
getPalabras();
verificaRespuesta.on('click', verificando);
reproducirAudio.on('click', reproducir);



answer.keypress(function(e) {
    if (e.which == 13) {
        verificando(e);
    }
});

function reproducir(e) {
    responsiveVoice.speak(palabrasSwap[indice].ingles);
}

function verificando(e) {
    if (bandera) {
        if (palabrasSwap.length == 0) {
            alert("Felicidades ganaste");
        } else {
            answer = document.getElementById("answer");
            if (String(answer.value.toLowerCase()) == String(palabrasSwap[indice].ingles.toLowerCase())) {
                answer.value = "";
                if (palabrasSwap[indice].contador - 1 == 0 && !palabrasSwap[indice].equibocacion) {
                    palabrasEliminadas.push(palabrasSwap[indice]);
                }
                if (palabrasSwap[indice].tipo == "agregada") {
                    if (!palabrasSwap[indice].equibocacion) {
                        e.preventDefault();
                        $.ajax({
                            url: '/setNuevoContador',
                            method: 'POST',
                            data: {
                                contador: palabrasSwap[indice].contador - 1,
                                id: palabrasSwap[indice].id
                            },
                            success: function(response) {
                                console.log(response);
                            }
                        });
                    }
                } else {

                    if (!palabrasSwap[indice].equibocacion) {
                        e.preventDefault();
                        $.ajax({
                            url: '/setNuevoContadorPractica',
                            method: 'POST',
                            data: {
                                contador: palabrasSwap[indice].contador - 1,
                                id: palabrasSwap[indice].id
                            },
                            success: function(response) {
                                console.log(response);
                            }
                        });
                    }
                }
                palabrasSwap.splice(indice, 1);
                indice = Math.floor(Math.random() * (palabrasSwap.length - 0) + 0);
                html = `Palabras restantes ${palabrasSwap.length}`;
                restantes.html(html);
                if (palabrasSwap.length != 0) {
                    porcentajeBarra += 5;
                    html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                    barra.html(html);
                    html = `Traduce ${palabrasSwap[indice].espanol}`
                    traduciendo.html(html);
                    html = "";
                    equibocacion.html(html);

                } else {
                    var monedas = 3;
                    porcentajeBarra += 5;
                    html = `<div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:${porcentajeBarra}%;">${porcentajeBarra}%</div>`;
                    barra.html(html);
                    html = `<h1 class="text-center">Resumen</h1>
                            <hr>
                            <h2>Has ganado 3 monedas por terminar esta ronda</h2>
                            <hr>`
                    if (palabrasEliminadas != 0) {
                        if (palabrasEliminadas.length == 1) {
                            html += `<h4>Palabra aprendida</h4>
                                    <h6 >${palabrasEliminadas[0].espanol} + 5 monedas</h6>`;
                            monedas += 5;
                        } else {
                            html += `<h4>Palabras aprendidas</h4>`
                            for (var i = 0; i < palabrasEliminadas.length; i++) {
                                html += `<h6 >${palabrasEliminadas[i].espanol} + 5 monedas</h6>`;
                                monedas += 5;
                            }
                        }
                    }

                    html += ` <hr>
                            <h2 class="text-center">Monedas totales = ${monedas}</h2>
                            <p class="text-center"><button class="btn btn btn-success" type="button" id="nuevoJuego" name="nuevoJuego">Nuevo Juego</button></p>
                            `;
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
