const payment = require('express').Router();

payment.get("/payment", async function (req, res) {
    const { type } = req.query;
    if (type) {
       res.status(200).send(
           { typeStatus: "Theres some type", type: type }
       );
    } else {
       res.send("No status");
    }
});

payment.post("/logout", async function (req, res) {
     
    const { type, typeName } = req.body;
     //do something
     res.send("Something type");
});

module.exports = payment;