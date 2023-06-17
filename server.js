const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))



//path to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//wildcard route to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

