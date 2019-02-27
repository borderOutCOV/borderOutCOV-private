var divSabias5 = $('#Sabias5');
var divSabias2 = $('#Sabias2');
var dijoSi = $('#dijoSi');
var palabrasSwap;
var contador = 1;

function renderizarSabias() {
    var html5 = '';
    var html2 = '';
    $.ajax({
        url: '/getPalabras',
        success: function(palabras) {
            palabrasSwap = palabras;
            alert(palabras.length);
            if (palabras != undefined) {
                html2 += `<h2>¿Sabias qué ${palabras[0].ingles} quiere decir ${palabras[0].espanol}?</h2>`;
                html5 += `<h4>¿Sabias qué ${palabras[0].ingles} quiere decir ${palabras[0].espanol}?</h5>`;


            } else {
                html2 += `<h2>No tienes más palabras que aprender para esta categoria</h2>`;
                html5 += `<h5>No tienes más palabras que aprender para esta categoria</h5>`;
            }
            divSabias5.html(html5);
            divSabias2.html(html2);
        }
    })


}

renderizarSabias();
dijoSi.on('click', function() {

    if (contador < palabrasSwap.length) {
        var html5 = '';
        var html2 = '';
        html2 += `<h2>¿Sabias qué ${palabrasSwap[contador].ingles} quiere decir ${palabrasSwap[contador].espanol}?</h2>`;
        html5 += `<h5>¿Sabias qué ${palabrasSwap[contador].ingles} quiere decir ${palabrasSwap[contador].espanol}?</h5>`;
        divSabias5.html(html5);
        divSabias2.html(html2);
        contador++;
    } else {
        var html5 = '';
        var html2 = '';
        html2 += `<h2>Estas fueron todas las palabras de esta categoria</h2>`;
        html5 += `<h5>Estas fueron todas las palabras de esta categoria</h5>`;
        divSabias5.html(html5);
        divSabias2.html(html2);
    }
});