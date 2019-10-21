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
      console.log(usuarios);
      console.log("Sala creada");
      let personas  = usuarios.getPersonas();
      client.broadcast.emit('usuariosConectadosSala', personas);
      callback("Sala creada");
    }else {
      callback(null);
    }
  });

  client.on('unirseSala', (data, callback) => {
    if(data){
      let usuario_actual = usuarios.getPersonaConectada(data.amigo);
      let sala_actual = usuario_actual.sala;
      //Hacer un promise de ajax.
      client.join(sala_actual);
      usuarios.unirASala(data.yo,sala_actual);
      console.log(usuarios);
      //usuarios.unirASala(nombre,data);
      console.log("Te uniste a la sala");
      let personas  = usuarios.getPersonas();
      client.broadcast.emit('usuariosConectadosSala', personas);
      callback("Te uniste a la sala de: "+data.amigo);
    }else {
      callback("Error mortal");
    }
  });

  client.on('test', (data, callback) => {
    console.log(data);
    client.broadcast.to(data).emit('test',"Si funciono");
  });



  client.on('sendRoomInvitation', (data, callback) => {
    let usuario_actual = usuarios.getPersonaConectada(data.origen);
    let sala_actual = usuario_actual.sala;
    if(data && sala_actual){
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
