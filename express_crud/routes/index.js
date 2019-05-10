var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db.db', (err) => {
	if (err) {
	    return console.error(err.message);
	}
	console.log('index.js:', 'Connected to the SQlite database.');
});



/* GET home page. */
router.get('/', function(req, res, next) {
	db.all("SELECT id, name, price, category FROM product", [], (err, row) => {
		if (err) {
			console.log(err.message);
		}

	    res.render('index', { title: 'Daftar Produk', data: row });
	});
});

router.get('/tambah-produk', function(req, res, next) {
    res.render('tambah_produk', { title: 'Tambah Produk' });
});

router.post('/edit-produk', function(req, res, next) {
	console.log(req.body);
	db.run('UPDATE product SET name = ?, price = ?, category = ? WHERE id = ?', [req.body.name, req.body.price, req.body.category, req.body.id], (err) => {
			if (err)
				return console.log(err.message);
			res.redirect('/');
	});
});

router.get('/edit-produk/:id', function(req, res, next) {
	db.each("SELECT id, name, price, category FROM product WHERE id = " + req.params.id, (err, row) => {
		if (err) {
			console.log(err.message);
		}
	console.log(row)
    res.render('edit_produk', { title: 'Edit Produk', data: row });
	});
});

router.get('/hapus-produk/:id', function(req, res, next) {
	db.run('DELETE FROM product WHERE id = ?', req.params.id, (err) => {
		if (err)
			return console.log(err.message);
		res.redirect('/');
	});
});

router.post('/tambah-produk', function(req, res, next) {

	db.run("INSERT into product (id, name, price, category) VALUES (NULL, ?, ?, ?)", [req.body.name, req.body.price, req.body.category], (err) => {
		if (err) {
			res.render('tambah_produk', { title: 'Tambah Produk', message: false });
			// db.close();	
			return console.log(err.message);
		}
		console.log('index.js:', 'Berhasil menambahkan data.');
		res.redirect('/');
	});
});	
module.exports = router;
