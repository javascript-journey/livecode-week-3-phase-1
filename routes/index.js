var express = require('express');
var todo = require('express');
var router = express.Router();
//Load modules
var sqlite = require('sqlite3').verbose();
var file = 'todo.db';
var db = new sqlite.Database(file);

var products = [];
// Run SQL one at a time
db.serialize(function() {

	db.each("SELECT * FROM produk", function(err, row) {
		products.push(row);
	});

});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Product', data : products });
});

/* GET home page. */
router.get('/add-products', function(req, res, next) {
	res.render('addProduk', { title: 'Product'});
});

/* GET home page. */
router.post('/proses-add-produk', function(req, res, next) {

	// Run SQL one at a time
	db.serialize(function() {
		var stmtProduk = db.prepare("INSERT INTO produk (name,price,category) VALUES (?, ?,?)");

		stmtProduk.run(req.name, req.price, req.category);
		
		stmtProduk.finalize();
	});
	
	res.redirect('/');

});

module.exports = router;
