var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
var sqlite = require('sqlite3').verbose();
var file = 'todo.db';
var db = new sqlite.Database(file);
var fs = require('fs');

// Sample Data
var produk = [
{
	"name": "Sikat Gigi",
	"price": "5000",
	"category": "Umum"
},
{
	"name": "Sabun Lifeboy",
	"price": "3500",
	"category": "Umum"
}
];

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

    var insertProduk = db.prepare("INSERT INTO produk (name,price,category) VALUES (?, ?,?)");
    for (var i = 0; i < produk.length; i++) {
    	insertProduk.run(produk[i].name, produk[i].price ,produk[i].category);
    }
    insertProduk.finalize();


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
