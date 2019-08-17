const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const fs = require('fs');
const controller = require('../controller/controlerUsuario');

const usuarios = new Usuarios();




io.on('connection', (client) => {
  

  client.on('conectarse', (data, callback) => {
    if(data){
      let personas = usuarios.agregarPersona(client.id,data);
      console.log(personas);
      var jsonObject = personas;
      var jsonContent = JSON.stringify(jsonObject);
      fs.writeFileSync('./server/data/userConnected.json',jsonContent);
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
        var jsonObject = usuarios.getPersonas();
        var jsonContent = JSON.stringify(jsonObject);
        fs.writeFileSync('./server/data/userConnected.json',jsonContent);
        client.broadcast.emit('usuariosConectados', usuarios.getPersonas());
      }
  });
});
