// Here is where you set up a model for how to interface with the database
// It is a layer between the ORM and the controller

var orm = require('../config/orm.js');

// Set up the burger object
var burger = {
	// Use the orm selectAll method to return all records
	all: function (cb) {
		orm.selectAll('burgers', function(res) {
			cb(res);
		});
	},
	// Use the orm insertOne method to insert a new record
	create: function(cols, vals, cb) {
		orm.insertOne('burgers', cols, vals, function (res) {
			cb(res);
		});
	},
	// Use the orm updateOne method to update a single record
	update: function(objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, function(res) {
			cb(res);
		});
	}
};

module.exports = burger;
