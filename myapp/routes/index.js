var express = require('express');
var router = express.Router();

var sqlite = require('sqlite3').verbose();
var file = 'todo.db';
var db = new sqlite.Database(file);


let produk = [];
db.serialize(function() {

	db.each("SELECT * FROM produk", function(err, row) {
		produk.push(row);
	});

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',data:produk});
 
});

router.get('/tambah-produk', function(req, res, next) {
	res.render('tambahProduk', { title: 'Tambah Produk'});
});

module.exports = router;
