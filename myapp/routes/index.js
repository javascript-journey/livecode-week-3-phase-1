var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3').verbose();
var file = 'todo-js.db';
var db = new sqlite.Database(file);


let produk = [];
db.serialize(function() {
	db.each("SELECT * FROM produk", function(err, row) {
		produk.push(row);
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if (produk.length > 0) {
		var data_produks = 1;
	}else{
		var data_produks = 0;
	}
  res.render('index', { title: 'Express',data:produk,data_produk:data_produks});
});

router.get('/tambah-produk', function(req, res, next) {
	res.render('tambahProduk', { title: 'Tambah Produk'});
});

router.post('/proses-tambah-produk', function(req, res, next) {
	if (produk.length > 0) {
		var data_produks = 1;
	}else{
		var data_produks = 0;
	}
	db.run("INSERT INTO produk (name,price,category) VALUES (?, ?,?)", [req.body.name, req.body.price, req.body.category], (err) => {     
    if (err) { 
      return console.log(err); 
    }else{ 
      console.log(`${req.body.name}. Berhasil Ditambahkan`); 
      res.render('index', { title: 'Express',data:produk,data_produk:data_produks});
    } 
  });  

});


router.get('/delete-produk/(:id)', function(req, res){ 
  db.run("DELETE FROM produk WHERE id= ?", req.params.id, function(err){ 
    if(err) { 
      return console.log(err) 
    } else { 
      console.log(`id ${req.params.id} Berhasil Dihapus`); 
      res.redirect('/'); 
    }; 
 
  }) 
}) 

module.exports = router;
