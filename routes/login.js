const login = require('express').Router();

login.get("/login", async function (req, res) {
    const { status } = req.query;
    if (status) {
       res.status(200).send(
           { loginStatus: "Theres some status", status: status }
       );
    } else {
       res.send("No status");
    }
});

book.post("/logout", async function (req, res) {
     
    const { status, statusName } = req.body;
     //do something
     res.send("Something status");
});

module.exports = login;