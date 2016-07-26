'use strict';
var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = passportLocalSequelize.defineUser(sequelize, {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};