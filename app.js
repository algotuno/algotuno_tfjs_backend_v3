var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/tfjs_run_model');
var azureRouter = require('./routes/azure_mgt');

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: false, limit: '100mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tfjs_run_model', usersRouter);
app.use('/azure_mgt', azureRouter);

module.exports = app;
