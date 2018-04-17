var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite = require('sqlite3').verbose();
var file = 'todo-js.db';
var db = new sqlite.Database(file);
var fs = require('fs');

var CREATE_TABLE_PRODUK = "CREATE TABLE IF NOT EXISTS produk ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, price INTEGER NOT NULL , category VARCHAR NOT NULL )";

// Run SQL one at a time
db.serialize(function() {
    // Create table
    db.run(CREATE_TABLE_PRODUK, function(err) {
    	if (err) {
    		console.log(err);
    	} else {
    		console.log('CREATE TABLE SUCCES');
    	}
    });
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tambah-produk', indexRouter); 
app.use('/proses-tambah-produk', indexRouter); 

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
