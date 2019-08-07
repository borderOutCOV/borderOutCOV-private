const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();


io.on('connection', (client) => {

  client.on('conectarse', (data, callback) => {
    if(data){
      let personas = usuarios.agregarPersona(client.id,data);
      console.log(personas);
      client.broadcast.emit('usuariosConectados', personas);
      callback(personas);
    }else {
      callback(null);
    }

  });

  client.on('disconnect', () => {
      let personaBorrada = usuarios.borrarPersona(client.id);
      if(personaBorrada){
        console.log("Persona borrada");
        console.log(personaBorrada);
        console.log(usuarios);
        client.broadcast.emit('usuariosConectados', usuarios.getPersonas());
      }
  });




});
