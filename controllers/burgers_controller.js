// Here is where you create all the functions that will do the routing for your app,
// and the logic of each route.

var express = require('express');
var router = express.Router();
var Burger = require('../models/')["Burger"];
var Customer = require('../models/')["Customer"];
var moment = require('moment');

// Redirect the root route '/' to /burgers
router.get('/', function(req, res) {
	res.redirect('/burgers');
});

// At the default /burgers route, use the burger model to retrieve all records
router.get('/burgers', function(req, res) {
	Burger.findAll({include:{model: Customer}})
	.then(function(burgers) {
		console.log(burgers);
		return res.render('index', {burgers})
	});
});

// This is the post route that is called as the POST Action, it then uses the burger
// model create method to create a new record and then redirect to /burgers
router.post('/burgers/create', function(req, res) {
	Burger.create({burger_name: req.body.burger_name})
	.then(function(newBurger){
		console.log(newBurger);
		res.redirect('/');
	});	
});

// This is the route used to update a record based on its id, it uses 'put' rather than
// 'post' since it is an update
router.put('/burgers/update', function(req, res) {
	Customer.create({customer_name: req.body.customer_name})
	.then(function(myCustomer) {
		return Burger.findOne({where:{id: req.body.burger_id}})
		.then(function(devourBurger) {
			return devourBurger.setCustomer(myCustomer)
			.then(function() {
				return devourBurger.updateAttributes({
					devoured: true
				}).then(function() {
					res.redirect('/burgers');	
				})
			})
		})
	})
});

module.exports = router;