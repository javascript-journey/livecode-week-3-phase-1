var express = require('express');
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

	var stmtProduk = db.prepare("INSERT INTO produk (name,price,category) VALUES (?, ?,?)");

	stmtProduk.run(req.param('name'), req.param('price'), req.param('category'));
	
	stmtProduk.finalize();

	if (products.length == 0) {
		var newId = 1;
	}else{
		var lastIndex = products.length - 1;
		var newId = products[lastIndex].id + 1;	
	}
	products.push({
		id: newId,
		name:req.param('name'),
		price:req.param('price'),
		category:req.param('category')
	});

	res.redirect('/');

});

router.get('/products-edit/(:id)', function(req,res,next){
	let sql = `SELECT * FROM produk WHERE id  = ?`;
	let id = req.params.id;
	var produks = {};

	// first row only
	db.get(sql, [id], (err, row) => {
		res.render('editProduk', { title: 'Product', id : row.id, name : row.name, price : row.price, category : row.category });
	});

});

router.post('/proses-edit-produk/(:id)', function(req,res,next){

	let data = [req.param('name'),req.param('category'),req.param('price'),req.param('id')];
	let sql = `UPDATE produk SET name = ?,category = ?,price = ? WHERE id = ?`;

	db.run(sql, data, function(err) {
		if (err) {
			return console.error(err.message);
		}
		console.log('Berhasil Edit Product');
	});

	let index = products.findIndex(produk => produk.id == req.param('id'));
	if (index >= 0) {
		products[index].name = req.param('name');
		products[index].price = req.param('price');
		products[index].category = req.param('category');
	}
	console.log(index);
	res.redirect('/');

});

router.get('/delete/(:id)', function (req, res) {

	let sql = `DELETE FROM produk WHERE id= ? `;
	db.run(sql, req.params.id, function(err) {
		if (err) {
			return console.error(err.message);
		}
		console.log(`Berhasil Menghapus`);
	});

	let index = products.findIndex(produk => produk.id == req.params.id);
	if (index >= 0) {
		products.splice(index,1)
	}
	console.log(index);
	res.redirect('/');
});

module.exports = router;
