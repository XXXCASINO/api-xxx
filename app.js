const express = require('express');
const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Middleware para analisar dados codificados em URL
app.use(express.urlencoded({ extended: true }));

module.exports = app;