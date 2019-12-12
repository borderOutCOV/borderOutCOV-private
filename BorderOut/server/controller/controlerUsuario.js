const bcryptjs = require('bcryptjs');

const pool = require('../data/database');
const jwt = require('jsonwebtoken');
const controller = {};

/*
controller.respond = function(socket_io){

  socket_io.on('connection', (client) => {
    client.broadcast.emit('recibirSolicitud', "Eres chido");
  });
  return socket_io;
}*/

//Rutas de usuario
controller.abreVideos = (req, res) => {
    res.render('videos', {});
}
controller.abreAdmin = (req, res) => {
    res.render('adminView', {});
}
controller.openQuejas = (req, res) => {
    res.render('quejas', {});
}
controller.abreAdminConsole = (req, res) => {
    res.render('adminConsole', {});
}

controller.abrePractica = (req, res) => {
    res.render('practica', {});
}
controller.abreAmpliarVocabulario = (req, res) => {
    res.render('ampliarVocabulario', {});
}

controller.getUserConected = (req, res) => {
    res.json(req.session.usuario.username);
}

controller.getCategorias = async(req, res) => {
    let categorias = await pool.query('SELECT * FROM categoria');
    res.json(categorias)
}
controller.setNuevoContador = async(req, res) => {
    if (req.body.contador > 0) {
        query = `update palabraagregadausuario set contador = ${req.body.contador} where IdPalabra=${req.body.id};`;
    } else {
        query = `update palabraagregadausuario set contador = ${req.body.contador}, estado=2 where IdPalabra=${req.body.id};`;
    }
    await pool.query(query);
    res.send("Done");
}
controller.setNuevoContadorPractica = async(req, res) => {
    if (req.body.contador > 0) {
        query = `update palabrausuario set contador = ${req.body.contador} where id=${req.body.id};`;
    } else {
        query = `update palabrausuario set contador = ${req.body.contador}, estado=2 where id=${req.body.id};`;
    }
    await pool.query(query);
    res.send("Done");
}
controller.setMonedas = async(req, res) => {
    query = `update usuario set monedas = monedas+${req.body.monedas} where username="${req.session.usuario.username}";`;
    await pool.query(query);
    res.send("Done");
}
controller.deletePalabra = async(req, res) => {
    await pool.query(`DELETE FROM palabraagregadausuario WHERE IdPalabra =${req.body.id};`);
    res.send("Done");
}

controller.repasaPalabra = async(req, res) => {
    var datos = req.body.datos.split("/");
    var id = datos[2];
    var bd_update = datos[3];
    var id_tabla = datos[4];
    await pool.query(`UPDATE ${bd_update} SET estado=1 WHERE ${id_tabla}=${id};`);
    res.send("Done");
}

controller.editarPalabra = async(req, res) => {
    var datos = req.body.datos.split("/");
    var espanol = datos[0];
    var ingles = datos[1];
    var id = datos[2];
    await pool.query(`UPDATE palabraagregadausuario SET ingles='${ingles}', espanol='${espanol}' WHERE IdPalabra =${id};`);
    res.send("Done");
}

controller.postPalabras = async(req, res) => {

    const newPalabra = {
        estado: 1,
        contador: 20,
        usuario: req.session.usuario.username,
        palabra: req.body.palabra,
        id: null
    };
    console.log(req.session.usuario.username);
    await pool.query('INSERT INTO palabrausuario set ?', [newPalabra]);
    console.log(newPalabra);

    res.send("Done");
}
controller.getMyWords = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
         SELECT  ingles, espanol,IdPalabra
         FROM palabraagregadausuario
         WHERE usuario="${req.session.usuario.username}" `;
        let palabras = await pool.query(query, []);
        res.json(palabras);
        //res.send(req.session.usuario.username);
    }
}

controller.getUserData = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {

        var query = `
      SELECT  username, nombre, paterno, materno, foto
      FROM usuario
      WHERE username="${req.session.usuario.username}" `;
        let data = await pool.query(query, []);
        res.json(data);
    }
}

controller.myRequests = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
      SELECT  emisor
      FROM solicitud
      WHERE receptor="${req.session.usuario.username}" `;
        let data = await pool.query(query, []);
        res.json(data);
    }
}


controller.getActualUser = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        res.json(req.session.usuario.username);
    }
}

controller.getMyFriends = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
      SELECT  *
      FROM amigos
      WHERE amigo1="${req.session.usuario.username}" OR amigo2="${req.session.usuario.username}"`;
        let data = await pool.query(query, []);
        res.json(data);
    }
}

controller.getFriends = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
      SELECT  *
      FROM amigos
      WHERE amigo1="${req.params.myself}" OR amigo2="${req.params.myself}"`;
        let data = await pool.query(query, []);
        res.json(data);
    }
}

controller.searchFriend = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
    SELECT  username
    FROM usuario
    WHERE username LIKE "%${req.params.friendToFind}%" `;
        let usuarios = await pool.query(query, []);
        //  res.send(query);
        res.json(usuarios);
    }
}

controller.getFriendData = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {

        var query = `
    SELECT  username, foto
    FROM usuario
    WHERE username = "${req.params.friendToFind}" `;
        let usuarios = await pool.query(query, []);
        res.json(usuarios);
    }
}

controller.acceptRequest = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
    DELETE FROM solicitud
    WHERE emisor ="${req.session.usuario.username}" AND receptor = "${req.params.friend}" `;
        await pool.query(query, []);

        var query2 = `
    DELETE FROM solicitud
    WHERE emisor ="${req.params.friend}" AND receptor = "${req.session.usuario.username}" `;
        await pool.query(query2, []);

        const nuevoAmigo = {
            amigo1: req.session.usuario.username,
            amigo2: req.params.friend
        };

        await pool.query('INSERT INTO amigos set ?', [nuevoAmigo]);
        res.json("Done");
    }
}

controller.agregarQueja = async(req, res) => {
    const nuevaQueja = {
        usuario: req.session.usuario.username,
        mensaje: req.body.queja
    };
    await pool.query('INSERT INTO queja set ?', [nuevaQueja]);
    res.render("quejas", {});
}

controller.deleteFriend = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `
    DELETE FROM amigos
    WHERE amigo1 ="${req.session.usuario.username}" AND amigo2 = "${req.params.friend}"  OR amigo2 ="${req.session.usuario.username}" AND amigo1 = "${req.params.friend}"`;
        await pool.query(query, []);
        res.json("Done");
    }
}

controller.sendFriendRequest = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json("Error");
    } else {

        var isYourFriend = `
    SELECT  *
    FROM solicitud
    WHERE emisor = "${req.session.usuario.username}" AND receptor = "${req.params.friend}";`;
        let friendAlready = await pool.query(isYourFriend, []);

        var isYourFriend2 = `
    SELECT  *
    FROM solicitud
    WHERE emisor = "${req.params.friend}" AND receptor = "${req.session.usuario.username}";`;
        let friendAlready2 = await pool.query(isYourFriend2, []);


        var querySolicitud = `
    SELECT  *
    FROM amigos
    WHERE amigo1 = "${req.session.usuario.username}" AND amigo2 = "${req.params.friend}";`;
        let solicitud = await pool.query(querySolicitud, []);
        if (req.session.usuario.username == req.params.friend) {
            res.json("Same");
        } else if ((friendAlready === undefined || friendAlready.length == 0) && (solicitud === undefined || solicitud.length == 0) && (friendAlready2 === undefined || friendAlready2.length == 0)) {
            const newSolicitud = {
                emisor: req.session.usuario.username,
                receptor: req.params.friend
            };
            await pool.query('INSERT INTO solicitud set ?', [newSolicitud]);
            let data = require('../data/userConnected.json');
            const { io } = require('../server');
            for (var i = 0; i < data.length; i++) {
                if (data[i]["nombre"].localeCompare(req.params.friend) == 0) {
                    io.sockets.connected[data[i]["id"]].emit('recibirSolicitud', "Recibiste una solicitud de " + req.session.usuario.username);
                }
            }
            res.json("Done");
        } else {
            res.json("Already");
        }
    }
}

controller.getPalabras = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.send("Error");
    } else {
        var query = `
        SELECT  IdPalabra, ingles, espanol, palabrausuario.usuario, palabra, categoria
        FROM palabra
        LEFT JOIN palabrausuario
            ON palabra.IdPalabra = palabrausuario.palabra and palabrausuario.usuario="${req.session.usuario.username}"
        WHERE palabra.categoria=${req.session.idcategoria} and palabrausuario.usuario is null
        `;
        let palabras = await pool.query(query, []);
        //  res.send(query);
        res.json(palabras);
    }
}
controller.getPalabrasAprendidas = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.send("Error");
    } else {
        var query = `
        SELECT  p.ingles,p.espanol,pu.palabra
        FROM palabrausuario AS pu
        LEFT JOIN palabra AS p
        ON pu.palabra=p.IdPalabra
        WHERE pu.estado=2 AND pu.usuario="${req.session.usuario.username}"; `;
        var query1 = `
        SELECT  ingles,espanol,IdPalabra
        from palabraagregadausuario
        where estado=2 and usuario="${req.session.usuario.username}";`;
        let palabrasUsuario = await pool.query(query, []);
        let palabrasAgregadaUsuario = await pool.query(query1, []);
        //  res.send(query);
        var result = [];
        result.push(palabrasUsuario);
        result.push(palabrasAgregadaUsuario);
        res.json(result);
    }
}
controller.getPalabrasActuales = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.send("Error");
    } else {
        var query = `
        SELECT  p.ingles,p.espanol,pu.palabra
        FROM palabrausuario AS pu
        LEFT JOIN palabra AS p
        ON pu.palabra=p.IdPalabra
        WHERE pu.estado=1 AND pu.usuario="${req.session.usuario.username}"; `;
        let palabrasUsuario = await pool.query(query, []);
        var result = [];
        result.push(palabrasUsuario);
        res.json(result);
    }
}
controller.getPalabrasPractica = async(req, res) => {
    if (req.session.usuario.username == undefined) {
        res.json("Error");
    } else {
        var query = `
        select palabra.ingles, palabra.espanol, palabrausuario.contador, palabrausuario.id from palabra inner join palabrausuario on palabra.IdPalabra=palabrausuario.palabra and palabrausuario.usuario="${req.session.usuario.username}" and palabrausuario.estado=1 order by rand() limit 20;
        `;
        let palabras = await pool.query(query, []);
        //res.send(query);
        res.json(palabras);
    }
    res.json(req.session.username);
}
controller.getPalabrasPracticaUsuario = async(req, res) => {
    if (req.session.usuario.username == undefined) {
        res.json("Error");
    } else {
        var query = `
        select palabraagregadausuario.ingles, palabraagregadausuario.espanol, palabraagregadausuario.contador, palabraagregadausuario.IdPalabra from palabraagregadausuario where palabraagregadausuario.usuario="${req.session.usuario.username}" and palabraagregadausuario.estado=1 order by rand() limit 20;

        `;
        let palabras = await pool.query(query, []);
        //res.send(query);
        res.json(palabras);
    }
    res.json(req.session.username);
}

controller.setcategoria = (req, res) => {
    req.session.idcategoria = req.params.id;
    res.json({ message: "listo" });
}

controller.abreTinder = async(req, res) => {
    let categoria = await pool.query('SELECT * FROM categoria WHERE idCategoria = ?', [req.session.idcategoria]);
    if (categoria.length === 0) {
        res.render('ampliarVocabulario', {});
    } else {
        res.render(`tinder`, { categoria: categoria[0].nombre });
    }
}

controller.abreAddPalabra = (req, res) => {
    console.log(req.body.id);
    res.render(`addPalabra`, {});
}

controller.openMyWords = (req, res) => {
    console.log(req.body.id);
    res.render(`myWords`, {});
}

controller.openfindFriend = (req, res) => {
    res.render(`findFriend`, {});
}

controller.openAcceptFriend = (req, res) => {
    res.render(`aceptFriend`, {});
}

controller.openMyFriends = (req, res) => {
    res.render(`myFriends`, {});
}

controller.abreConfigurar = (req, res) => {
    res.render('configuration', {});
}
controller.abrePalabrasAprendidas = (req, res) => {
    res.render(`palabras_aprendidas`, {});
}

controller.abrePalabrasActuales = (req, res) => {
    console.log(req.body.id);
    res.render(`palabras_actuales`, {});
}

//Funciones de apoyo
function encriptaContrasena(contrasena) {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(contrasena, salt);
    return hash;
}

function verificaConrasena(contrasena, hash) {
    if (bcryptjs.compareSync(contrasena, hash)) {
        return true;
    } else {
        return false;
    }
}




controller.abreLogin = (req, res) => {
    var mensaje = "";
    res.render('index', {});
}
controller.abreError = (req, res) => {
    res.render('error', { mensaje: "No has iniciado sección" });
}


controller.changeUserData = async(req, res) => {

    var username = req.body.username;
    var nombre = req.body.nombre;
    var paterno = req.body.paterno;
    var materno = req.body.materno;
    var contra = req.body.contra;
    var contra2 = req.body.contra2;
    var imagen = req.body.foto_data;


    try {
        await pool.query(`UPDATE usuario SET nombre='${nombre}', paterno='${paterno}',  materno='${materno}' WHERE username ='${req.session.usuario.username}';`);
        if (contra.length > 0) {
            if (contra.localeCompare(contra2) == 0) {
                contra = encriptaContrasena(contra);
                await pool.query(`UPDATE usuario SET contrasena='${contra}' WHERE username ='${req.session.usuario.username}';`);
            }
        }
        if (imagen.length > 0) {
            await pool.query(`UPDATE usuario SET foto='${imagen}' WHERE username ='${req.session.usuario.username}';`);
        }
        res.render("configuration", {});
    } catch {
        res.render('error', { mensaje: "Hubo un error al tratar de guardar la palabra" });
    }
}


controller.abreRoom = (req, res) => {
    res.render('room', {});
}

controller.dameCategorias = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `SELECT  nombre FROM categoria`;
        let usuario
        categorias = await pool.query(query, []);
        res.json(categorias);
    }
}
controller.dameIdCategoria = async(req, res) => {
    if (req.session.usuario.correo == undefined) {
        res.json();
    } else {
        var query = `SELECT  idCategoria FROM categoria Where nombre = "${req.params.categoria}"`;
        let usuario
        categorias = await pool.query(query, []);
        res.json(categorias);
    }
}

controller.addWord = async(req, res) => {

    const newPalabraUsuario = {
        IdPalabra: null,
        ingles: req.body.pingles,
        nivel: 3,
        categoria: 5,
        idTipoPalabra: 6,
        espanol: req.body.pespanol,
        usuario: req.session.usuario.username,
        estado: 1,
        contador: 21
    }
    try {
        pool.query('INSERT INTO palabraagregadausuario set ?', [newPalabraUsuario]);
        // res.send("funciomo");
        res.render("addPalabra", {});
    } catch {
        res.render('error', { mensaje: "Hubo un error al tratar de guardar la palabra" });
    }
}

controller.save = async(req, res) => {
    req.body.password = encriptaContrasena(req.body.password);

    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.email]);
    if (existe.length == 0) {
        let existe = await pool.query('SELECT * FROM usuario WHERE username = ?', [req.body.username]);
        if (existe.length == 0) {
            const newuser = {
                username: req.body.username,
                nombre: req.body.nombre,
                paterno: req.body.apaterno,
                materno: req.body.amaterno,
                monedas: 5,
                contrasena: req.body.password,
                tipo: 0,
                enlace: 'aaaaa',
                correo: req.body.email
            };
            try {
                pool.query('INSERT INTO usuario set ?', [newuser]);
                let token = jwt.sign({
                    usuario: newuser
                }, process.env.seed, { expiresIn: 60 * 60 * 24 * 30 });


                req.session.token = token;
                console.log(token);
                res.redirect('videos');
            } catch {
                res.render('error', { mensaje: "Hubo un error al tratar de guardar la información" });
            }
        } else {
            res.render('error', { mensaje: "Error ese nombre de usuario ya esta registrado" });
        }
    } else {

        res.render('error', { mensaje: "Error ese correo ya esta registrado" });
    }
}




controller.login = async(req, res) => {

    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.email]);
    if (existe.length == 0) {
        res.render('error', { mensaje: "Usuario no encontrado" });
    } else {
        if (verificaConrasena(req.body.password, existe[0].contrasena)) {
            let token = jwt.sign({
                usuario: existe[0]
            }, process.env.seed, { expiresIn: 60 * 60 * 24 * 30 });
            req.session.token = token;

            if (existe[0].tipo == 1) {
                res.redirect('/admin');
            } else {
                res.redirect('videos');
            }
        } else {
            res.render('error', { mensaje: "Contraseña invalida" });
        }
    }
    //res.redirect('/');
}

controller.verificaToken = (req, res, netx) => {

    var token = req.session.token;
    jwt.verify(token, process.env.seed, (err, decode) => {
        if (err) {
            res.render('error', { mensaje: `Usted aun no ha iniciado sesión` });
        } else {
            req.session.usuario = decode.usuario;
            netx();
        }
    })




    /*
    const newuser = {
        username: 'q',
        nombre: 'q',
        paterno: 'q',
        materno: 'q',
        monedas: 5,
        contrasena: 'q',
        tipo: 1,
        enlace: 'aaaaa',
        correo: 'q'
    };*/
    //req.session.usuario = newuser;
    //netx();
}
controller.verificaAdmin = (req, res, netx) => {
    if (req.session.usuario.tipo == 1) {
        netx();
    } else {
        res.render('error', { mensaje: `No está autorizado para ver esta información` });
    }
}

module.exports = controller;
