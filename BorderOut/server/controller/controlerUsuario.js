const bcryptjs = require('bcryptjs');

const connection = require('../data/connection.js');

function encriptaContrasena(contrasena) {
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(contrasena, salt);
    return hash;
}

function verificaConrasena(contrasena, hash) {
    if (bcrypt.compareSync(contrasena, hash)) {
        //pasa a videos
    } else {
        //contraseña incorrecta
    }
}


const controller = {};

controller.abreLogin = (req, res) => {
    res.render('index', {});
}
controller.prueba = (req, res) => {
    res.render('videos', {});
}
controller.save = (req, res) => {
    req.body.password = encriptaContrasena(req.body.password);
    console.log(req.body);

    var sql = `INSERT INTO usuario(username, nombre, paterno, materno, monedas, contrasena, tipo, enlace, correo)`
    sql += `VALUES ('${req.body.username}','${req.body.nombre}','${req.body.apaterno}','${req.body.amaterno}',5,'${req.body.password}',0,'aaaaaa','${req.body.email}');`
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.end();
    res.send(sql);

}

module.exports = controller;