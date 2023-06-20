const router = require('express').Router();
const fs = require('fs');
const { nanoid } = require('nanoid'); //random id gen
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json')


router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

//save new note to db with unique id
router.post('/notes', (req, res) => {

    const {title, text} = req.body; //deconstruct the body of the request
    const newNote = { title, text, id: nanoid(5) } //rebuild, with unique id

    fs.readFile(dbPath, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            err ? console.log(err) : console.log('Note added!');
        });
        res.json(newNote);
    });
});

//delete note from db -- target the note by unique id and filter the array to all notes that do not match the id
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== id);
        fs.writeFile(dbPath, JSON.stringify(newNotes), (err) => {
            err ? console.log(err) : console.log('Note deleted!');
        });
        res.json(newNotes);
    });
});

module.exports = router;