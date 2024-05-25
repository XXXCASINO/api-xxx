const user = require('express').Router();
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

// Rota genérica para 'user' que maneja 'login', 'logout', e 'register'
user.post("/user/:action", async function (req, res) {
    const { action } = req.params;
    const { name, email, password } = req.body;
    
    switch (action) {
        case 'login':
            console.log("Login request received");
            // Aqui entra a lógica de verificação do login
            res.send({ message: "Login successful" });
            break;
        case 'logout':
            console.log("Logout request received");
            // Aqui entra a lógica de logout
            res.send({ message: "Logout successful" });
            break;
        case 'register':
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
            break;
        default:
            res.status(400).send("Invalid action");
    }
});

module.exports = user;
