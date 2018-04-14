var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crud Express' });
});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'Express' });
});
router.get('/tambahProduk', function(req, res, next) {
  res.render('demo', { title: 'Express' });
});

module.exports = router;
