var divRespuesta = $('#respuesta');

function renderizarRespuesta(resp) {
    var html5 = '';
    html5 += `<br><br><h4>${resp}</h4>`;
    html5+= `<div class="spinner-border"></div>`;
    divRespuesta.html(html5);
}

$(document).on('click', '#enviar', function () {
    var frase = $("#frase").val();
    var url = 'http://127.0.0.1:5000/IA/'+frase;
    alert("Traduciendo tu frase, espera....");
    $.ajax({
        url: url,
        success: function (data) {
            renderizarRespuesta(data);
        },
        error: function(e) {
            renderizarRespuesta('Falló traduccion');
        }
    });
});
