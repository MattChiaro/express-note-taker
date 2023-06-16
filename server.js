const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
const path = require('path');

//path to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//path back 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

