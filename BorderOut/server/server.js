require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
let server = http.createServer(app);
const rutasUsuario = require('./routes/rutasUsuario.js');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: (60 * 60 * 24 * 30)
    }
}));

app.use('/', rutasUsuario);

hbs.registerPartials(path.resolve(__dirname, '../views/parciales'));

console.log(path.resolve(__dirname, '../views/parciales'));
app.set('view engine', 'hbs');

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});