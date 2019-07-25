

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
        let persona = { id, nombre};
        this.personas.push(persona);
        return this.personas;
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
