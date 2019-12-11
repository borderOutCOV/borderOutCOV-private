class Salas {
  constructor() {
    this.datosSalas = [];
  }
  crearSala(nombreSala) {
    var categorias = [];
    var contador = 1;
    let sala = { nombreSala, categorias, contador};
    this.datosSalas.push(sala);
    return this.datosSalas;
  }
  agregarCategoriaSala(nombreSala,categoria){
    for (var i = 0; i < this.datosSalas.length; i++) {
      if(this.datosSalas[i]['nombreSala']==nombreSala){
        this.datosSalas[i]['categorias'].push(categoria);
        break;
      }
    }
  }
  incrementarContador(nombreSala){
    for (var i = 0; i < this.datosSalas.length; i++) {
      if(this.datosSalas[i]['nombreSala']==nombreSala){
        this.datosSalas[i]['contador'] += 1;
        break;
      }
    }
  }
  decrementarContador(nombreSala){
    for (var i = 0; i < this.datosSalas.length; i++) {
      if(this.datosSalas[i]['nombreSala']==nombreSala){
        this.datosSalas[i]['contador'] -= 1;
        break;
      }
    }
  }
  getSala(nombreSala){
    let sala = this.datosSalas.filter(sala => sala.nombreSala === nombreSala)[0];
    return sala;
  }
  borrarSala(nombreSala) {
      let salaBorrada = this.getSala(nombreSala);
      if(salaBorrada){
        this.datosSalas = this.datosSalas.filter(sala => sala.sala != nombreSala);
        return salaBorrada;
      }else {
        return null;
      }
  }

}

module.exports = {
    Salas
}
