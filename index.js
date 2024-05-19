const express = require("express");
const mysql = require('mysql2');
const app = express();

// Configuração da conexão ao banco de dados
const pool = mysql.createPool({
    host: "database-1.c7i0emwesv74.us-east-2.rds.amazonaws.com",
    user: "admin",
    database: "databasexxx",
    password: "Xxx202405",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para consultar dados
function getData(callback) {
    pool.query('SELECT * FROM databasexxx.users', function (err, results, fields) {
        if (err) return callback(err);
        callback(null, results);
    });
}

// Rota principal
app.get('/', (req, res) => {
    getData((err, results) => {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        res.send(results);
    });
});

app.listen(9001, ()=>{
    console.log('Running')
})
