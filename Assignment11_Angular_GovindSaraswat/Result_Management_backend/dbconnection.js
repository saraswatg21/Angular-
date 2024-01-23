const mysql = require('mysql2');

const dbconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'result',
    port:3306
});

module.exports = dbconnection;