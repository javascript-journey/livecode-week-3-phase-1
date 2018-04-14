var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demodb.db');


/* GET home page. */
router.get('/', function(req, res, next) {
	db.get("SELECT nama,price,category FROM produk", function(err, row){
  res.render('index', { title: 'Express',produk:row});
  });
});

module.exports = router;
