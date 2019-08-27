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

  client.on('crearSala', (data, callback) => {
    if(data){
      client.join(data);
      console.log("Sala creada");
      callback("Sala creada");
    }else {
      callback(null);
    }
  });
  client.on('sendRoomInvitation', (data, callback) => {
    if(data){
      id = usuarios.getId(data.destino);
      console.log(id);
      client.broadcast.to(id).emit('recibeInvitation','Recibiste una invitacion de '+data.origen);
      //console.log("Sala creada");
      callback("Envitacion enviada");
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
