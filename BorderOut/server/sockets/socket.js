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
      usuarios.unirASala(data,data);
      console.log(personas);
      console.log("Sala creada");
      callback("Sala creada");
    }else {
      callback(null);
    }
  });

  client.on('unirseSala', (data, callback) => {
    if(data){
      //Hacer un promise de ajax.
      client.join(data);
      //usuarios.unirASala(nombre,data);
      console.log("Te uniste a la sala");
      callback("Te uniste a la sala de: "+data);
    }else {
      callback(null);
    }
  });

  client.on('test', (data, callback) => {
    console.log(data);
    client.broadcast.to(data).emit('test',"Si funciono");
  });



  client.on('sendRoomInvitation', (data, callback) => {
    if(data){
      id = usuarios.getId(data.destino);
      console.log(id);
      client.broadcast.to(id).emit('recibeInvitation',data.origen);
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
