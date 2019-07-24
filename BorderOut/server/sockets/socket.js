const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    /*
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });*/

    client.on('connect', (data, callback) => {
      console.log("xdxdxdxd");
      }else {
        callback("Inicia sesion");
      }
      });

    });

    client.on('disconnect', () => {
      if(client.id){
        let personaBorrada = usuarios.borrarPersona(client.id);
        if(personaBorrada){
          console.log("Usuario borrado: ");
          console.log(personaBorrada);
        }
      }
    });



});
