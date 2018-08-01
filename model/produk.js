 var sqlite = require('sqlite3').verbose();
 var file = 'todo.db';
 var db = new sqlite.Database(file);
 var fs = require('fs');

// Sample Data
var produk = [
{
	"name": "Laptop",
	"price": "20000000",
	"category": "Elektronik"
},
{
	"name": "Keyboard",
	"price": "100000",
	"category": "Elektronik"
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

    var stmtProduk = db.prepare("INSERT INTO produk (name,price,category) VALUES (?, ?,?)");
    for (var i = 0; i < produk.length; i++) {
    	stmtProduk.run(produk[i].name, produk[i].price ,produk[i].category);
    }
    stmtProduk.finalize();


});