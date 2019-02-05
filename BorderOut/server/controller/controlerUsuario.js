const bcryptjs = require('bcryptjs');

const pool = require('../data/database');
const funcionesDB = require('../data/funcionesDB');

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


const controller = {};

controller.abreLogin = (req, res) => {
    var mensaje = "";
    res.render('index', {});
}
controller.abreError = (req, res) => {
    res.render('error', { mensaje: "No has iniciado sección" });
}
controller.prueba = (req, res) => {
    res.render('videos', {});
}
controller.save = async(req, res) => {
    req.body.password = encriptaContrasena(req.body.password);

    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.email]);
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
        pool.query('INSERT INTO usuario set ?', [newuser]);

        res.redirect('videos');
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
            res.redirect('videos');
        } else {
            res.render('error', { mensaje: "Contraseña invalida" });
        }


    }
    //res.redirect('/');
}

module.exports = controller;