const user = require('express').Router();

user.post("/user", async function (req, res) {
    const { action, name, email, password } = req.query;
    
    switch (action) {
        case 'login':
            console.log("Login request received");
            res.send({ message: "Login successful" });
            break;
        case 'logout':
            console.log("Logout request received");
            res.send({ message: "Logout successful" });
            break;
        case 'register':
            console.log("Register request received with:", name, email);
            // Aqui entra a lógica de inserção no banco de dados
            res.send({ message: "User successfully registered", userId: "exampleId" });
            break;
        default:
            res.status(400).send("Invalid action");
    }
});

module.exports = user;
