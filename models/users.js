'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    Name: DataTypes.STRING,
    Lastname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};