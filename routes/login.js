const login = require('express').Router();
const mysql = require('mysql2');

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

login.get("/login", async function (req, res) {
    const { status } = req.query;
    if (status) {
       res.status(200).send({ loginStatus: "Theres some status", status: status });
    } else {
       res.send("No status");
    }
});

login.post("/logout", async function (req, res) {
    const { status, statusName } = req.body;
    //do something
    res.send("Something status");
});

// Rota para adicionar um novo usuário
login.post("/register", function (req, res) {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    pool.query(sql, [name, email, password], function (err, result) {
        if (err) {
            res.status(500).send('Failed to register user: ' + err.message);
        } else {
            res.send({ userId: result.insertId, message: "User successfully registered" });
        }
    });
});

module.exports = login;