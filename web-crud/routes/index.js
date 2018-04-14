var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'WEB CRUD - ExpressJS Sqlite3' });
});

// add produk
router.get('/tambah-produk', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('index/tambah-produk', {
    	title: 'Menambah Produk Baru',
    	name: '',
    	price: '',
    	category: ''
    })
})

module.exports = router;
