const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database(':toko:', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Tersambung Database Sqlite3 toko.');
});

db.serialize(function(){

	db.run("CREATE TABLE produk (info TEXT)");

});

db.close();