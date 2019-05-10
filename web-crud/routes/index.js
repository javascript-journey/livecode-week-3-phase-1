const sqlite3 = require('sqlite3').verbose();
var express = require('express');
var router = express.Router();

var db = new sqlite3.Database('toko.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Tersambung Database Sqlite3 Toko.');
});

var daftar_produk = [];
var SELECT_DATA = "SELECT * FROM produk";
var INSERT_DATA = "INSERT INTO produk (name, price, category) VALUES (?, ?, ?)";
var DELETE_DATA = "DELETE FROM produk WHERE id=?";
var SELECT_DATA_WHERE_ID = "SELECT * FROM produk WHERE id=?";
var UPDATE_DATA_WHERE_ID = "UPDATE produk SET name=?, price=?, category=? WHERE id=?";

// READ PRODUK
router.get('/', function(req, res, next) {
	db.all(SELECT_DATA, (err, rows) => {
		if (err) {
			return console.log(err.message);
		}
		res.render('index', { title: 'Daftar Produk - ExpressJS Sqlite3', daftar_produks: rows});
	})
});

// CREATE PRODUK
router.post('/tambah-produk', function(req, res, next){
	db.run(INSERT_DATA, [req.body.name, req.body.price, req.body.category], (err) => {		
		if (err) {
			return console.log(err);
		}else{
			console.log(`Berhasil Menambahkan Data ${req.body.name}.`);
			res.redirect('/');
		}
	}); 
})

// FORM EDIT
router.get('/edit-produk/(:id)', function(req, res, next) {
	db.all(SELECT_DATA_WHERE_ID, req.params.id,(err, row) => {
		if (err) {
			return console.log(err.message);
		}
		console.log(row[0].name);
		res.render('formEdit', { title: 'Form Edit Produk - ExpressJS Sqlite3', id:row[0].id, name:row[0].name, price:row[0].price, category:row[0].category});
	})
});

// EDIT PRODUK
router.post('/proses-edit-produk/(:id)', function(req, res, next) {
	db.run(UPDATE_DATA_WHERE_ID, [name=req.body.name, price=req.body.price, category=req.body.category, id=req.params.id], (err) => {		
		if (err) {
			return console.log(err);
		}else{
			console.log(`Berhasil Mengubah Data ${req.body.name}.`);
			res.redirect('/');
		}
	}); 
});


// DELETE PRODUK
router.get('/hapus-produk/(:id)', function(req, res){
	db.run(DELETE_DATA, req.params.id, function(err){
		if(err) {
			return console.log(err)
		} else {
			console.log(`Data ID = ${req.params.id} Berhasil Dihapus`);
			res.redirect('/');
		};

	})
})

module.exports = router;
