var divTabla = $('#tabla');
var palabrasRest;

function getTablePalabrasAprendidas() {
    var html5 = '';
    $.ajax({
        url: '/getPalabrasAprendidas',
        success: function(palabras) {
            palabrasRest = palabras;
            console.log(palabrasRest[0]);
            console.log(palabrasRest[1]);
            var palabrasNivel1 = palabrasRest[0];
            var palabrasNivel2 = palabrasRest[0];
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
                    var json = palabrasNivel1[i].espanol + "/" + palabrasNivel1[i].ingles + "/" + palabrasNivel1[i].palabra;
                    html5 += `<tr class='bonita'>
                    <td class='bonita text-center'>${palabrasNivel1[i].espanol}</td>
                    <td class='bonita text-center'>${palabrasNivel1[i].ingles}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${json}" id="repaso">Repaso</button></td>
                    `;
                }

                for (var i = 0; i < palabrasNivel2.length; i++) {
                    var json = palabrasNivel1[i].espanol + "/" + palabrasNivel2[i].ingles + "/" + palabrasNivel2[i].IdPalabra;
                    html5 += `
                    <td class='bonita text-center'>${palabrasNivel1[i].espanol}</td>
                    <td class='bonita text-center'>${palabrasNivel1[i].ingles}</td>
                    <td class='bonita text-center'><button type="button" class="btn btn-info" data-elemento="${json}" id="repaso">Repaso</button></td>
                </tr>`;
                }
            } else {
                html5 += `<h5>No tienes palabras Aun</h5>`;
            }
            divTabla.html(html5);
        }
    });
}

getTablePalabrasAprendidas();