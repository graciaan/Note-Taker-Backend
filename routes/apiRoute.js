const express = require('express');
const app = express();
const path = require("path");

app.get('/api/notes', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});


module.exports = app;