const express = require('express');

const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

const app = express();

app.use('/api' , apiRouter);
app.use(htmlRouter);


module.exports = app;