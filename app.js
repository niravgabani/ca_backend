require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const CronJob  = require('cron').CronJob;
const axios = require('axios');
let mongoose = require("mongoose");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
mongoose.set('runValidators', true);
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
  console.log("Well done! connected with mongoDB database");
}).on('error', error => {
  console.log("Oops! database connection error:" + error);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const adminpaths = [
  {pathUrl: '/login', routerFile: 'login'},
  {pathUrl: '/sizeMaster', routerFile: 'sizeMaster'},
  {pathUrl: '/categories', routerFile: 'categories'},

];
adminpaths.forEach((path) => {
  app.use('/admin'+path.pathUrl, require('./routes/admin/'+path.routerFile));
});

// const userpaths = [
// ];
// userpaths.forEach((path) => {
//   app.use('/user' + path.pathUrl, require('./routes/users/' + path.routerFile));
// });

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
  res.render('error');
});

module.exports = app;
