// The connection.js file sets up the mysql connection parameters whether
// it is a locally hosted database or a jaws database

var mysql = require('mysql');

var connection;

// If there is a JAWSDB_URL environment variable, then set up JAWSdb connection
// Otherwise set up the localhost connection
if (process.env.JAWSDB_URL) {
	console.log("Connect to JAWSDB:", process.env.JAWSDB_URL);
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'burgers_db'
	});
};

connection.connect(function (err) {
	if(err) {
		console.error('error connection: ' + err.stack);
		return;		
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;