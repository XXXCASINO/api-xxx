const express = require("express")
const mysql = require('mysql2')
const app = express()
const cors = require('cors')

// Configuração da conexão ao banco de dados
const pool = mysql.createPool({
    host: "sql.freedb.tech",
    user: "freedb_gambling",
    database: "freedb_xxxdatabase",
    password: "w%gSsa35VC46VJV",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors())

// Função para consultar dados
function getData(callback) {
    pool.query('SELECT * FROM freedb_xxxdatabase.users', function (err, results, fields) {
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
