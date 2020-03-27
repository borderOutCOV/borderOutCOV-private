var divTabla = $('#tabla');
var divTotal = $('#total');
var palabrasRest;

function getTablePalabrasActuales() {
    var html5 = '';
    $.ajax({
        url: '/getPalabrasActuales',
        success: function(palabras) {
            palabrasRest = palabras;
            var palabrasNivel1 = palabrasRest[0];
            if (palabras != undefined) {
                html5 += `<table id="table_id" class='table table-bordered table-striped table-hover display'>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Español</th>
                        <th class='text-center'>Ingles</th>
                    </tr>
                </thead>
                <tbody>`;

                for (var i = 0; i < palabrasNivel1.length; i++) {
                    var json = palabrasNivel1[i].espanol + "/" + palabrasNivel1[i].ingles + "/" + palabrasNivel1[i].palabra + "/palabrausuario/palabra";
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabrasNivel1[i].espanol}</td>
                    <td class='bonita text-center'>${palabrasNivel1[i].ingles}</td>
                    </tr>`;
                }
                html5 +=`</tbody>
                </table>`;
            } else {
                html5 += `<h5>No tienes palabras Aun</h5>`;
            }
            var totalPalabras = palabrasNivel1.length;
            divTabla.html(html5);
            divTotal.html(`<p class="total">Total: ${totalPalabras}</p>`);
            $('#table_id').DataTable();
        }
    });
}
getTablePalabrasActuales();