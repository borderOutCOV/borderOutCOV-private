var htmlJuego = '<div class="widget nueva_entrada">\
    <div class="col-12">\
<h3 id="restantes">Palabras restantes 20</h3>\
        <div class="progress mb-3" style="height:30px;" id="barra">\
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width:1%;">0%</div>\
        </div>\
        <hr>\
</div>\
    <!--<div class="row">\
        <div class="col-sm-4 col-12">\
            <h6>\
                SandyLaSalvaje\
                <div class="progress mb-3" style="height:10px;">\
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width:25%;">25%</div>\
                </div>\
            </h6>\
        </div>\
        <div class="col-sm-4 col-12">\
            <h6>\
                JuanEscutia\
                <div class="progress mb-3" style="height:10px;">\
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width:75%;">75%</div>\
                </div>\
            </h6>\
        </div>\
        <div class="col-sm-4 col-12">\
            <h6>\
                Maria666\
                <div class="progress mb-3" style="height:10px;">\
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width:15%;">15%</div>\
                </div>\
            </h6>\
        </div>\
    </div>-->\
    <div class="row">\
        <div class="col-12 justify-content-center" id="divFinal">\
            <div class="form-group">\
                <h1 class="text-center"><input type="button" id="reproducirAudio" name="reproducirAudio" value="🔊 Play"> <span id="traduciendo">Traduce </span></h1>\
                <input type="text" name="text" class="form-control" placeholder="Answer" id="answer">\
                <br>\
                <p class="text-center"><button class="btn btn btn-warning" type="button" id="verificaRespuesta" name="verificaRespuesta">Responder</button></p>\
                <br>\
                <!--Esto es en caso de que se equiboque-->\
                <p class="text-center" id="equibocacion"></p>\
            </div>\
        </div>\
    </div>\
    <script src="js/multijugador.js"></script>\
</div>';
