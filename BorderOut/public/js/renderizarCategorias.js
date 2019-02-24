var divCategoria = $('#categorias');

function renderizarCategoria() {
    var html = '';
    $.ajax({
        url: '/categorias',
        success: function(categorias) {


            for (var i = 0; i < categorias.length; i++) {
                html += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" data-id="${categorias[i].idCategoria}">`;
                html += `<div class="card card-body text-center justify-content-center align-items-center escala">`;
                if (categorias[i].imagen === "notFound") {
                    html += `<img src="/imagenes/categorias/default.PNG" border="1" alt="Error en la imagen" width="150" height="150">`;
                } else {
                    html += `<img src="/imagenes/categorias/${categorias[i].imagen}" border="1" alt="Error en la imagen" width="150" height="150">`;
                }
                html += `<p>${categorias[i].nombre}</p>`;
                html += `</div>`;
                html += `</div>`;
            }
            console.log(categorias[0].nombre);
            divCategoria.html(html);
        }
    })


}

renderizarCategoria();


divCategoria.on('click', 'div', function() {

    var id = $(this).data('id');

    $.ajax({
        url: `/setcategoria/${id}`,
        success: function() {
            alert("Hola mundo")
        }
    });
    if (id) {
        window.location = `/escogePalabras`;
    }

});