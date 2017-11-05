var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// var flash = require('connect-flash');
var index = require('./routes/index');
var home = require('./routes/home');
var app = express();
var router=express.Router();
var list=require('./controller/homelist/list');
var saveaddsomething=require('./controller/homelist/saveaddsomething');
var deleteRow=require('./controller/homelist/deleteRow');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'logo.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
app.use('/',index);
app.use(home);
app.use(list);
app.use(saveaddsomething);
app.use(deleteRow);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in developZment
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');
});

module.exports = app;
