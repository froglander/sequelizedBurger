'use strict';

// Require our models
var models = require("../models");

var sequelize = require('../models').sequelize;

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return models.Burger.bulkCreate(
      [
        {burger_name: "Cheeseburger", devoured: false},
        {burger_name: "Double Cheeseburger", devoured: false},
        {burger_name: "Triple Cheeseburger", devoured: false},
        {burger_name: "Quadruple Cheeseburger", devoured: false},
        {burger_name: "Quintuple Cheeseburger", devoured: false}
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return models.Burger.destroy({where:{burger_name: [
        "Cheeseburger",
        "Double Cheeseburger",
        "Triple Cheeseburger",
        "Quadruple Cheeseburger",
        "Quintuple Cheeseburger"
        ]}})
    .then(function() {
      // console.log(sequelize.query('SELECT LAST_INSERT_ID()'));

       return sequelize.query('ALTER TABLE burgers AUTO_INCREMENT=1');
    })
  }
};
