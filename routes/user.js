const user = require('express').Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: "sql.freedb.tech",
    user: "freedb_gambling",
    database: "freedb_xxxdatabase",
    password: "w%gSsa35VC46VJV",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

user.post("/user/:action", async function (req, res) {
    const { action } = req.params;
    const { username, name, email, password } = req.body;

    switch (action) {
        case 'login':
            const hashedPasswordLogin = await bcrypt.hash(password, 10);
            pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, hashedPasswordLogin], (err, results) => {
                if (results.length > 0) {
                    console.log("Login request received");
                    res.send({ message: "Login successful", user: results[0] });
                } else {
                    res.status(401).send("Login failed");
                }
            });
            break;
        case 'logout':
            console.log("Logout request received");
            res.send({ message: "Logout successful" });
            break;
        case 'register':
            const hashedPassword = await bcrypt.hash(password, 10);
            pool.query('INSERT INTO users (username, user, password, email) VALUES (?, ?, ?)', [username, name, hashedPassword, email], (err, result) => {
                if (err) {
                    res.status(500).send('Error registering new user: ' + err.message);
                } else {
                    console.log("Register request received with:", name, email);
                    res.send({ message: "User successfully registered", userId: result.insertId });
                }
            });
            break;
        case 'update':
            const newHashedPassword = await bcrypt.hash(password, 10);
            pool.query('UPDATE users SET password = ?, email = ? WHERE username = ?', [newHashedPassword, email, name], (err, result) => {
                if (err) {
                    res.status(500).send('Error updating user: ' + err.message);
                } else {
                    res.send({ message: "User updated successfully" });
                }
            });
            break;
        default:
            res.status(400).send("Invalid action");
    }
});

module.exports = user;
