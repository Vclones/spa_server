var mysql = require('mysql');
var db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'final',
   
});

db.connect((err) => {
   if (err) throw err;
   console.log("Connected to the database");
});

module.exports = db;