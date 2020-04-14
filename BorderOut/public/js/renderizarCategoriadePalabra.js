var divTabla = $('#tabla');
var palabrasSwap;
function renderizarCategoriaP() {
    var html5 = '';
    $.ajax({
        url: '/getCategoriasAdmin',
        success: function(palabras) {
            if (palabras != undefined) {
                html5 += `<table id="table_id" class='table table-bordered table-striped table-hover display'>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Categoria</th>
                        <th class='text-center'><button type="button" class="btn btn-info add" id="add">Agregar</button></th>
                    </tr>
                </thead>
                <tbody>`;

                for (var i = 0; i < palabras.length; i++) {
                    var json = palabras[i].nombre + "/" + palabras[i].idCategoria;
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabras[i].nombre}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-success" data-elemento="${json}" id="editar">Editar</button></td>
                </tr>`;
                }
                html5 +=`</tbody>
                </table>`;
            } else {
                showNotification("No tienes Categorias de palabras aun","b");
            }
            divTabla.html(html5);
            $('#table_id').DataTable();
        }
    })
}

$(document).on('click', '#add', function() {
    var html5 = '';
    html5 += `
    <div class="form-group">
        <label for="pespanol">Nombre Categoria:</label>
        <input type="text" name="categoriaPAdd" class="form-control" placeholder="Nueva Categoria" id="categoriaPAdd">
        <br>
        <div class="col">
        <button class= "btn btn-success btn-md btn-block " id="btn-Add" name="btn-success" >Aceptar</button>
        <button class= "btn btn-danger btn-md btn-block " id="btn-Cancelar">Cancelar</button>
        </div>
    </div>`;
    divTabla.html(html5);
});

$(document).on('click', '#btn-Cancelar', function() {
    location.reload();
});

$(document).on('click','#btn-Add',function() {
    var newTipoP = document.getElementById("categoriaPAdd").value;
    var datos = newTipoP;
    if (confirm("Seguro que Deseas Agregar?")) {
        $.ajax({
            url: '/AddCategoriaPalabra',
            method: 'POST',
            data: { datos: datos },
            success: function(data) {
                renderizarCategoriaP();
            }
        });
    }

});

$(document).on('click', '#btn-AceptarEdicion', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idEditar = divisiones[1];
    var newTipoP = document.getElementById("tipoP").value;
    var datos = newTipoP + "/" + idEditar;

    if (confirm("Seguro que Deseas Editar?")) {
        $.ajax({
            url: '/editarCategoriaPalabra',
            method: 'POST',
            data: { datos: datos },
            success: function(data) {
                renderizarCategoriaP();
            }
        });
    }

});

$(document).on('click', '#editar', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idBorrar = divisiones[1];
    var categoriaP = divisiones[0];
    var html5 = '';
    html5 += `
    <div class="form-group">
        <label for="pespanol">Nombre Categoria:</label>
        <input type="text" name="tipoP" class="form-control" placeholder="Tipo" id="tipoP">
        <br>
        <div class="col">
        <button class= "btn btn-success btn-md btn-block " id="btn-AceptarEdicion" data-elemento="${datos}" name="btn-success" >Aceptar</button>
        <button class= "btn btn-danger btn-md btn-block " id="btn-Cancelar"  >Cancelar</button>
        </div>
    </div>`;
    divTabla.html(html5);
    document.getElementById("tipoP").value = categoriaP;
});

renderizarCategoriaP();