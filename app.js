const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// var logger = require('winston');

var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/sign-up');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(__dirname + '/views/error.html');
});

module.exports = app;