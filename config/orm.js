// This file sets up the ORM functionality

var connection = require('./connection.js');

// This function I borrowed from one of the class activities
// It sets up how many question marks we will need to 
// pass parameters to the sql statement
function printQuestionMarks(num) {
	var array = [];

	for (var i = 0; i < num; i++) {
		array.push('?');
	}
	return array.toString();
}

// This function was also borrowed from a class activity.
// It is used for setting up which column(s) are being
// updated
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// This is our ORM object with methods that we will call in
// another file.

var orm = {
	// Method to select all values from a table
	selectAll: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	},
	// Inserts one record into the specified table
	insertOne: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString = queryString + ' (';
		queryString = queryString + cols.toString();
		queryString = queryString + ') ';
		queryString = queryString + 'VALUES (';
		queryString = queryString + printQuestionMarks(vals.length);
		queryString = queryString + ') ';

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if(err) throw err;
			cb(result);
		});

	},
	// Updates one record in the specified table that match the condition
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString = queryString + ' SET ';
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});

	}
};

module.exports = orm;