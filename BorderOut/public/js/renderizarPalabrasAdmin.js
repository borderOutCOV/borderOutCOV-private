var divTabla = $('#tabla');
var palabrasSwap;
var arrTipos;
var arrCategoria;
$.ajax({
    url: '/getTipoPalabra',
    method: 'GET',
    success: function(data) {
        arrTipos=data;
    }
});
$.ajax({
    url: '/getCategoriasAdmin',
    method: 'GET',
    success: function (data) {
        arrCategoria=data;
    }
});

function getIdTipo(value){
    for (var i = 0; i < arrTipos.length; i++){
        if(arrTipos[i].nombre==value){
            return arrTipos[i].Id;
        }
    }
}

function getIdCategoria(value){
    for (var i = 0; i < arrCategoria.length; i++){
        if(arrCategoria[i].nombre==value){
            return arrCategoria[i].idCategoria;
        }
    }
}

function renderizarPalabrasAdmin() {
    var html5 = '';
    $.ajax({
        url: '/getPalabrasAdmin',
        success: function (palabras) {
                html5 += `<table id="table_id" class='table table-bordered table-striped table-hover display'>
                <thead class='bonita'>
                    <tr class='bonita'>
                        <th class='text-center'>Ingles</th>
                        <th class='text-center'>Español</th>
                        <th class='text-center'>Categoria</th>
                        <th class='text-center'>Tipo Palabra</th>
                        <th class='text-center'></th>
                        <th class='text-center'><button type="button" class="btn btn-info add" id="add">Agregar</button></th>
                    </tr>
                </thead>
                <tbody>`;

                for (var i = 0; i < palabras.length; i++) {
                    var data = palabras[i].IdPalabra + '/' + palabras[i].ingles + '/' + palabras[i].espanol + '/' + palabras[i].idCategoria + '/' + palabras[i].categoria + '/' + palabras[i].idTipo + '/' + palabras[i].nombreTipo;
                    var dataDelete = palabras[i].IdPalabra + '/' + palabras[i].ingles + '/' + palabras[i].espanol;
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabras[i].ingles}</td>
                    <td class='bonita text-center'>${palabras[i].espanol}</td>
                    <td class='bonita text-center'>${palabras[i].categoria}</td>
                    <td class='bonita text-center'>${palabras[i].nombreTipo}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-success" data-elemento="${data}" id="editar">Editar</button></td>
                    <td class='bonita text-center'><button type="button" class="btn btn-danger" data-elemento="${dataDelete}" id="eliminar">Borrar</button></td>
                </tr>`;
                }
                html5 += `</tbody>
                </table>`;
            divTabla.html(html5);
            $('#table_id').DataTable();
        }
    })
}

$(document).on('click', '#add', function () {
    var html5 = '';
    html5 += `
    <div class="form-group">
        <label for="pespanol">Palabra en Español:</label>
        <input type="text" name="pespanol" class="form-control" placeholder="Palabra en español" id="pespanol">
        <label for="pingles">Palabra en Ingles:</label>
        <input type="text" name="pingles" class="form-control" placeholder="Palabra en ingles" id="pingles">
        <label for="selectCategoria">Categoria de la palabra:</label>
        <select class="form-control" id="selectCategoria">`;
    for (var i = 0; i < arrCategoria.length; i++){
        html5 +=`<option>${arrCategoria[i].nombre}</option>`;
    }
    html5 += `</select>`;

    html5 += `<label for="selectTipo">Tipo la palabra:</label>
    <select class="form-control" id="selectTipo">`;
    for (var i = 0; i < arrTipos.length; i++){
        html5 +=`<option>${arrTipos[i].nombre}</option>`;
    }
    html5 += ` </select>`;

    html5 +=`   <br>
        <div class="col">
        <button class= "btn btn-success btn-md btn-block " id="btn-Add" name="btn-success" >Aceptar</button>
        <button class= "btn btn-danger btn-md btn-block " id="btn-Cancelar">Cancelar</button>
        </div>
    </div>`;
    divTabla.html(html5);
    document.getElementById("selectCategoria").value = 'Sin categoria';
    document.getElementById("selectTipo").value ='Sin tipo';
});

$(document).on('click', '#btn-Cancelar', function () {
    location.reload();
});

$(document).on('click', '#btn-Add', function () {
    var pIngles = document.getElementById("pingles").value;
    var pEspanol = document.getElementById("pespanol").value;
    var idCategoria = getIdCategoria(document.getElementById("selectCategoria").value);
    var idTipo = getIdTipo(document.getElementById("selectTipo").value);
    var data = pIngles + '/' + pEspanol + '/' + idCategoria + '/' + idTipo;
    if (confirm("Seguro que Deseas Agregar?")) {
        $.ajax({
            url: '/AddPalabraAdmin',
            method: 'POST',
            data: { datos: data },
            success: function (data) {
               renderizarPalabrasAdmin();
            }
        });
    }

});

$(document).on('click', '#btn-AceptarEdicion', function () {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idEditar = divisiones[0];
    var pIngles = document.getElementById("pingles").value;
    var pEspanol = document.getElementById("pespanol").value;
    var idCategoria = getIdCategoria(document.getElementById("selectCategoria").value);
    var nombreCategoria = document.getElementById("selectCategoria").value;
    var idTipo = getIdTipo(document.getElementById("selectTipo").value);
    var nombreTipo = document.getElementById("selectTipo").value;
    var data = idEditar + '/' + pIngles + '/' + pEspanol + '/' + idCategoria + '/' + nombreCategoria + '/' + idTipo+ '/' + nombreTipo;
    console.log(data);
    if (confirm("Seguro que Deseas Editar?")) {
        $.ajax({
            url: '/editarPalabraAdmin',
            method: 'POST',
            data: { datos: data },
            success: function (data) {
                renderizarPalabrasAdmin();
            }
        });
    }

});

$(document).on('click', '#editar', function () {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idEditar = divisiones[0];
    var pIngles = divisiones[1];
    var pEspanol = divisiones[2];
    var idCategoria = divisiones[3];
    var nombreCategoria = divisiones[4];
    var idTipo = divisiones[5];
    var nombreTipo = divisiones[6];
    var html5 = '';
    html5 += `
    <div class="form-group">
        <label for="pespanol">Palabra en Español:</label>
        <input type="text" name="pespanol" class="form-control" placeholder="Palabra en español" id="pespanol">
        <label for="pingles">Palabra en Ingles:</label>
        <input type="text" name="pingles" class="form-control" placeholder="Palabra en ingles" id="pingles">
        <label for="selectCategoria">Categoria de la palabra:</label>
        <select class="form-control" id="selectCategoria">`;
    for (var i = 0; i < arrCategoria.length; i++){
        html5 +=`<option>${arrCategoria[i].nombre}</option>`;
    }
    html5 += `</select>`;

    html5 += `<label for="selectTipo">Tipo la palabra:</label>
    <select class="form-control" id="selectTipo">`;
    for (var i = 0; i < arrTipos.length; i++){
        html5 +=`<option>${arrTipos[i].nombre}</option>`;
    }
    html5 += ` </select>`;

    html5 +=`   <br>
        <div class="col">
        <button class= "btn btn-success btn-md btn-block " id="btn-AceptarEdicion" data-elemento="${datos}" name="btn-success" >Aceptar</button>
        <button class= "btn btn-danger btn-md btn-block " id="btn-Cancelar">Cancelar</button>
        </div>
    </div>`;
    divTabla.html(html5);
    document.getElementById("pespanol").value = pEspanol;
    document.getElementById("pingles").value = pIngles;
    document.getElementById("selectCategoria").value = nombreCategoria;
    document.getElementById("selectTipo").value = nombreTipo;
});

$(document).on('click', '#eliminar', function () {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idBorrar = divisiones[0];
    if (confirm("Estas seguro de eliminar \"" + divisiones[1] + "/" + divisiones[2] + "\"" + " ?")) {
        $.ajax({
            url: '/borrarPalabraAdmin',
            method: 'POST',
            data: { id: idBorrar },
            success: function (data) {
                renderizarPalabrasAdmin();
                showNotification("Palabra '" + divisiones[1] + "/" + divisiones[2] + "' ha sido eliminada", "g");
            }
        });
    }
});
renderizarPalabrasAdmin();