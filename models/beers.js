'use strict';
module.exports = function(sequelize, DataTypes) {
  var beers = sequelize.define('beers', {
    beer: DataTypes.STRING,
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return beers;
};