const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { Salas } = require('../classes/salas');
const fs = require('fs');
const controller = require('../controller/controlerUsuario');

const usuarios = new Usuarios();
const salas = new Salas();




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
  client.on('renderizarCategorias', (sala, callback) => {
    client.broadcast.to(sala).emit('renderizarCategorias',"funciona");
    callback("funciona");
  });
  client.on('estoyJugando', (data, callback) => {
    console.console.log("LOlololo");
    client.broadcast.to(data.sala).emit('estoyJugando',data.usuario)
    callback("funciona");
  });
  client.on('escogerCategorias', (data, callback) => {
    salas.agregarCategoriaSala(data.divIdSala,data.categoriaSeleccionada);
    salaActual = salas.getSala(data.divIdSala);
    if(salaActual['categorias'].length >= salaActual['contador']){
      client.broadcast.to(data.divIdSala).emit('escogerCategorias',"Llena");
      callback("Llena");
    }else {
      client.broadcast.to(data.divIdSala).emit('escogerCategorias',"Vacia");
      callback("Vacia");
    }
  });

  client.on('categoriasEscogidas', (sala,callback) => {
    salaActual = salas.getSala(sala);
    callback(salaActual['categorias']);
  });

  client.on('enviarPalabras', (data,callback) => {
    client.broadcast.to(data.idSala).emit('recibirPalabras',data.palabras);
    callback("Palabras enviadas");
  });
  client.on('aumentarContador', (data,callback) => {
    client.broadcast.to(data.sala).emit('aumentarContador',data.usuario);
    callback("Contador Enviado");
  });

  client.on('personasSala', (data, callback) => {
    if(data){
      let personas = usuarios.personasPorSala(data);
      client.broadcast.emit('usuariosConectadosSala',personas);
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
      salas.crearSala(data);
      //client.broadcast.emit('usuariosConectadosSala', personas);
      callback("Sala creada");
    }else {
      callback(null);
    }
  });

  client.on('unirseSala', (data, callback) => {
    if(data){
      let usuario_actual = usuarios.getPersonaConectada(data.amigo);
      let sala_actual = usuario_actual.sala;
      client.join(sala_actual);
      usuarios.unirASala(data.yo,sala_actual);
      console.log(usuarios);
      console.log("Te uniste a la sala");
      salas.incrementarContador(sala_actual);
      callback("Te uniste a la sala de: "+data.amigo);
    }else {
      callback("Error mortal");
    }
  });

  client.on('sendRoomInvitation', (data, callback) => {
    let usuario_actual = usuarios.getPersonaConectada(data.origen);
    let sala_actual = usuario_actual.sala;

    if(data && sala_actual){
      id = usuarios.getId(data.destino);
      frienToInvite = usuarios.getPersona(id);
      if(frienToInvite.sala==null){
        client.broadcast.to(id).emit('recibeInvitation',data.origen);
        callback("Envitacion enviada");
      }else {
        callback("El usurio ya se encuentra en una sala");
      }
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
        if(personaBorrada.sala){
          client.broadcast.emit('usuariosConectadosSala',usuarios.personasPorSala(personaBorrada.sala));
          salas.decrementarContador(personaBorrada.sala);
        }
      }
  });
});
