var divTabla = $('#tabla');
var divTotal = $('#total');
var palabrasRest;

function getTablePalabrasAprendidas() {
    var html5 = '';
    $.ajax({
        url: '/getPalabrasAprendidas',
        success: function(palabras) {
            palabrasRest = palabras;
            var palabrasNivel1 = palabrasRest[0];
            var palabrasNivel2 = palabrasRest[1];
            if (palabras != undefined) {
                html5 += `<table class='table table-bordered table-striped table-hover '>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Español</th>
                        <th class='text-center'>Ingles</th>
                        <th class='text-center'></th>
                    </tr>
                </thead>`;

                for (var i = 0; i < palabrasNivel1.length; i++) {
                    var json = palabrasNivel1[i].espanol + "/" + palabrasNivel1[i].ingles + "/" + palabrasNivel1[i].palabra + "/palabrausuario/palabra";
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabrasNivel1[i].espanol}</td>
                    <td class='bonita text-center'>${palabrasNivel1[i].ingles}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${json}" id="repaso">Repaso</button></td>
                    </tr>`;
                }

                for (var i = 0; i < palabrasNivel2.length; i++) {
                    var json = palabrasNivel2[i].espanol + "/" + palabrasNivel2[i].ingles + "/" + palabrasNivel2[i].IdPalabra + "/palabraagregadausuario/IdPalabra";
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabrasNivel2[i].espanol}</td>
                    <td class='bonita text-center'>${palabrasNivel2[i].ingles}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${json}" id="repaso">Repaso</button></td>
                    </tr>`;
                }
            } else {
                html5 += `<h5>No tienes palabras Aun</h5>`;
            }
            var totalPalabras = palabrasNivel1.length + palabrasNivel2.length;
            divTabla.html(html5);
            divTotal.html(`<p class="total">Total: ${totalPalabras}</p>`)
        }
    });
}

$(document).on('click', '#repaso', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    if (confirm("Estas seguro que desea repasar \n" + "\"" + divisiones[1] + "\"" + " ?")) {
        $.ajax({
            url: '/repasaPalabra',
            method: 'POST',
            data: { datos: datos },
            success: function(data) {
                getTablePalabrasAprendidas();
            }
        });
    }
});

getTablePalabrasAprendidas();