const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const hbs = require('hbs');
const mysql = require('mysql');

const path = require('path');

const app = express();
let server = http.createServer(app);
const rutasUsuario = require('./routes/rutasUsuario.js');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

app.use('/', rutasUsuario);

hbs.registerPartials(path.resolve(__dirname, '../views/parciales'));

console.log(path.resolve(__dirname, '../views/parciales'));
app.set('view engine', 'hbs');


// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alejandro',
    database: 'limitbreaker'
});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});