const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alejandro',
    database: 'limitbreaker'
});

module.exports = connection;