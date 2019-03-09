var divTabla = $('#tabla');
var palabrasSwap;

function renderizarMisPalabras() {
    var html5 = '';
    $.ajax({
        url: '/getMisPalabras',
        success: function(palabras) {
            palabrasSwap = palabras;
            if (palabras != undefined) {
                html5 += `<table class='table table-bordered table-striped table-hover '>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Español</th>
                        <th class='text-center'>Ingles</th>
                    </tr>
                </thead>`;

                for (var i = 0; i < palabras.length; i++) {

                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabras[i].espanol}</td>
                    <td class='bonita text-center'>${palabras[i].ingles}</td>
                </tr>`;
                }

            } else {
                html5 += `<h5>No tienes palabras Aun</h5>`;
            }
            divTabla.html(html5);
        }
    })


}

renderizarMisPalabras();