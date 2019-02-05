const pool = require('./database');

funcionesDB = {};
funcionesDB.insertar = async function(username, nombre, paterno, materno, contrasena, correo) {
    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    if (existe.length === 0) {
        const newuser = {
            username,
            nombre,
            paterno,
            materno,
            monedas: 5,
            contrasena,
            tipo: 0,
            enlace: 'aaaaaa',
            correo
        };
        pool.query('INSERT INTO usuario set ?', [newuser]);

        res.redirect('https://www.facebook.com');
    } else {
        res.send('error');
    }


}
funcionesDB.existeUsuario = async function(correo) {
    let existe = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    //console.log(existe);
    return existe;
}

module.exports = funcionesDB;