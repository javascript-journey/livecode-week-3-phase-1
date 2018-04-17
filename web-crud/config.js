const sqlite3 = require('sqlite3').verbose();

// Create Database "toko"
let db = new sqlite3.Database('toko.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Tersambung Database Sqlite3 Toko.');
});

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS produk ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, price INTEGER NOT NULL, category VARCHAR )";
let INSERT_DATA = "INSERT INTO produk (name, price, category) VALUES (?, ?, ?)";

// Seeder Produk
let produk = { "name":"Mouse Bluetooth Logitech", "price":58000, "category":"Hardware" }


db.serialize( () => {

	// CREATE tabel produk
	db.run(CREATE_TABLE, (err) => {
		if (err) {
			console.log(err);
		}else{
			console.log("Berhasil Membuat Tabel Produk");
		}
	});

	// INSERT seeder ke table produk
	db.run(INSERT_DATA, [produk.name, produk.price, produk.category], (err) => {		
		if (err) {
			console.log(err);
		}else{
			console.log("Berhasil Menambahkan Seeder ke Tabel Produk");
		}
	});

});