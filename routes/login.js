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
    console.log("Login request received with status:", status);
    if (status) {
       res.status(200).send({ loginStatus: "Theres some status", status: status });
    } else {
       res.send("No status");
    }
});

login.post("/logout", async function (req, res) {
    const { status, statusName } = req.body;
    console.log("Logout request received with status and statusName:", status, statusName);
    // Implementa a lógica de logout aqui
    res.send("Logout completed with status: " + status);
});

// Rota para adicionar um novo usuário
login.post("/register", function (req, res) {
    const { name, email, password } = req.body;
    console.log("Register request received with:", name, email);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    pool.query(sql, [name, email, password], function (err, result) {
        if (err) {
            console.error("Error registering user:", err.message);
            res.status(500).send('Failed to register user: ' + err.message);
        } else {
            console.log("User registered with ID:", result.insertId);
            res.send({ userId: result.insertId, message: "User successfully registered" });
        }
    });
});

module.exports = login;
