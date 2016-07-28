'use strict';

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = passportLocalSequelize.defineUser(sequelize, {
    displayUsername: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    usernameLowerCase: true,
  });
  return User;
};