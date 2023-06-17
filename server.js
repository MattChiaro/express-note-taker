
const express = require('express');
const fs = require('fs');
const { nanoid } = require('nanoid'); //random id gen


const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//path to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//grab data from db.json and display
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

//save new note to db with unique id
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body; //deconstruct the body of the request
    const newNote = { title, text, id: nanoid(5) } //rebuild, with unique id

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            err ? console.log(err) : console.log('Note added!');
        });
        res.json(newNote);
    });
});




//wildcard route to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))