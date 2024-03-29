const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const fs = require('fs');
const uuid = require('./helpers/uuid')
const notes = require('./db/db.json');
let parsedNotes = notes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
  console.info(`${req.method} request received to get notes`);
});



app.get('/api/notes', (req, res) => {
  res.json(parsedNotes)
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const {title, text} = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
