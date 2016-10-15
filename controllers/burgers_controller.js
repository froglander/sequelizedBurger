// Here is where you create all the functions that will do the routing for your app,
// and the logic of each route.

var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var moment = require('moment');

// Redirect the root route '/' to /burgers
router.get('/', function(req, res) {
	res.redirect('/burgers');
});

// At the default /burgers route, use the burger model to retrieve all records
router.get('/burgers', function(req, res) {
	burger.all(function(data) {		
		var hndlbrsObj = {burgers: data };
		console.log(hndlbrsObj);
		res.render('index', hndlbrsObj);
	});
});

// This is the post route that is called as the POST Action, it then uses the burger
// model create method to create a new record and then redirect to /burgers
router.post('/burgers/create', function(req, res) {
	burger.create(['burger_name', 'devoured', 'date'], [req.body.name, false, moment().format("YYYY-MM-DD HH:mm:ss")], function() {
		res.redirect('/burgers');
	});	
});

// This is the route used to update a record based on its id, it uses 'put' rather than
// 'post' since it is an update
router.put('/burgers/update/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;

	console.log("condition:", condition);

	burger.update({devoured: req.body.devoured }, condition, function() {
		res.redirect('/burgers');
	});
});

module.exports = router;