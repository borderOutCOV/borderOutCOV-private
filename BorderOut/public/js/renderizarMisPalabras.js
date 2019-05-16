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
                        <th class='text-center'></th>
                        <th class='text-center'></th>
                    </tr>
                </thead>`;

                for (var i = 0; i < palabras.length; i++) {
                    var json = palabras[i].espanol + "/" + palabras[i].ingles + "/" + palabras[i].IdPalabra;
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabras[i].espanol}</td>
                    <td class='bonita text-center'>${palabras[i].ingles}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-success" data-elemento="${json}" id="editar">Editar</button></td>
                    <td class='bonita text-center'><button type="button" class="btn btn-danger" data-elemento="${json}"  id="eliminar">Borrar</button></td>
                </tr>`;
                }

            } else {
                html5 += `<h5>No tienes palabras Aun</h5>`;
            }
            divTabla.html(html5);
        }
    })
}

$(document).on('click', '#eliminar', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idBorrar = divisiones[2];
    if (confirm("Estas seguro de eliminar \"" + divisiones[0] + "/" + divisiones[1] + "\"" + " ?")) {
        $.ajax({
            url: '/borrarPalabra',
            method: 'POST',
            data: { id: idBorrar },
            success: function(data) {
                renderizarMisPalabras();
            }
        });
    }

});

$(document).on('click', '#btn-Cancelar', function() {
    location.reload();
});

$(document).on('click', '#btn-AceptarEdicion', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idEditar = divisiones[2];
    var espanol = document.getElementById("pespanol").value;
    var ingles = document.getElementById("pingles").value;
    var datos = espanol + "/" + ingles + "/" + idEditar;

    if (confirm("Seguro que Deseas Editar?")) {
        $.ajax({
            url: '/editarPalabra',
            method: 'POST',
            data: { datos: datos },
            success: function(data) {
                renderizarMisPalabras();
            }
        });
    }

});

$(document).on('click', '#editar', function() {
    var datos = $(this).data("elemento");
    var divisiones = datos.split("/");
    var idBorrar = divisiones[2];
    var p_espanol = divisiones[0];
    var p_ingles = divisiones[1];
    var html5 = '';
    html5 += `
    <div class="form-group">
        <label for="pespanol">Palabra en español:</label>
            <input type="text" name="pespanol" class="form-control" placeholder="Palabra en español" id="pespanol">
            <label for="pingles">Palabra en ingles:</label>
            <input type="text" name="pingles" class="form-control" placeholder="Palabra en ingles" id="pingles">
            <br>
            <div class="col">
            <button class= "btn btn-success btn-md btn-block " id="btn-AceptarEdicion" data-elemento="${datos}" name="btn-success" >Aceptar</button>
            <button class= "btn btn-danger btn-md btn-block " id="btn-Cancelar"  >Cancelar</button>
            </div>
    </div>`;
    divTabla.html(html5);
    document.getElementById("pespanol").value = p_espanol;
    document.getElementById("pingles").value = p_ingles;
});

renderizarMisPalabras();