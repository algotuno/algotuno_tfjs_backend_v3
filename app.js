const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/tfjs_run_model');
const azureRouter = require('./routes/azure_mgt');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: false, limit: '100mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tfjs_run_model', usersRouter);
app.use('/azure_mgt', azureRouter);

module.exports = app;
