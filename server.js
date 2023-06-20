//dependencies
const express = require('express');
const routes = require('./routes');

//express setup
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(routes)

//listener
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))