

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
      var sala = null;
      let persona = { id, nombre, sala};
      this.personas.push(persona);
      return this.personas;
    }
    unirASala(nombre,sala){
      let persona = this.personas.filter(persona => persona.nombre === nombre)[0];
      persona.sala = sala;
      return persona.sala;
    }
    personasPorSala(sala){
      let persona = this.personas.filter(persona => persona.sala === sala);
      return persona;
    }

    salirSala(nombre,sala){
      let persona = this.personas.filter(persona => persona.nombre === nombre)[0];
      persona.sala = null;
      return persona.sala;
    }

    getId(nombre){
      let persona = this.personas.filter(persona => persona.nombre === nombre)[0];
      return persona.id;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonaConectada(nombre) {
        let persona = this.personas.filter(persona => persona.nombre === nombre)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    /*
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }*/

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        if(personaBorrada){
          this.personas = this.personas.filter(persona => persona.id != id);
          return personaBorrada;
        }else {
          return null;
        }
    }


}


module.exports = {
    Usuarios
}
