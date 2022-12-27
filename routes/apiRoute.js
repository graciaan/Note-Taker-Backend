const express = require('express');
const api = express();
const path = require("path");


api.get('/api/notes', (req, res) => {
  readAndAppend('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


module.exports = api;