const bcryptjs = require('bcryptjs');

const pool = require('../data/database');
const jwt = require('jsonwebtoken');
const controller = {};
//Rutas de usuario
controller.abreVideos = (req, res) => {
    res.render('videos', {});
}
controller.abreAmpliarVocabulario = (req, res) => {
    res.render('ampliarVocabulario', {});
}

controller.getCategorias = async(req, res) => {
    let categorias = await pool.query('SELECT * FROM categoria');
    res.json(categorias)
}

controller.postPalabras = async(req, res) => {

    const newPalabra = {
        estado: 1,
        contador: 20,
        usuario: req.session.usuario.username,
        palabra: req.body.palabra,
        id: null
    };
    await pool.query('INSERT INTO palabrausuario set ?', [newPalabra]);
    console.log(newPalabra);

    res.send("Done");
}
















controller.getPalabras = async(req, res) => {
    if (req.session.idcategoria == undefined) {
        res.json();
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

//Funciones de apollo 
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

            res.redirect('videos');
        } else {
            res.render('error', { mensaje: "Contraseña invalida" });
        }
    }
    //res.redirect('/');
}

controller.verificaToken = (req, res, netx) => {

    /*
    var token = req.session.token;

    jwt.verify(token, process.env.seed, (err, decode) => {
        if (err) {
            res.render('error', { mensaje: `Usted aun no ha iniciado sesión` });
        } else {
            req.session.usuario = decode.usuario;
            console.log(req.session.usuario);
            netx();
        }
    })
    */

    
    
    const newuser = {
        username: 'q',
        nombre: 'a',
        paterno: 'a',
        materno: 'a',
        monedas: 5,
        contrasena: 'a',
        tipo: 0,
        enlace: 'aaaaa',
        correo: 'a'
    };
    req.session.usuario = newuser;
    netx();
    
}

module.exports = controller;