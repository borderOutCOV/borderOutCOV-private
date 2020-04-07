var divTabla = $('#tabla');
var palabrasRest;

function getTableQuejas() {
    var html5 = '';
    $.ajax({
        url: '/getQuejas',
        success: function(quejas) {
            if (quejas != undefined) {
                html5 += `<table id="table_id" class='table table-bordered table-striped table-hover display'>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Usuario</th>
                        <th class='text-center'>Queja</th>
                        <th class='text-center'>Fecha</th>
                    </tr>
                </thead>
                <tbody>`;

                for (var i = 0; i < quejas.length; i++) {
                    var date = new Date(quejas[i].date);
                    var dateShow = date.toLocaleString("es-MX",{dateStyle:'short',timeStyle: 'short',hour12:true});
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${quejas[i].usuario}</td>
                    <td class='bonita text-center'>${quejas[i].mensaje}</td>
                    <td class='bonita text-center'>${dateShow}</td>
                    </tr>`;
                }
                html5 +=`</tbody>
                </table>`;
                divTabla.html(html5);
                $('#table_id').DataTable();
            } else {
                showNotification("No Tienes Quejas Aun","g")
            }
        }
    });
}

getTableQuejas();