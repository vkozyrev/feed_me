'use strict';

// Models
var Meal = require('.').Meal
  , User = require('.').User;

module.exports = function(sequelize, DataTypes) {
  var UserMeal = sequelize.define('UserMeal', {
    userId: {
      type: DataTypes.INTEGER,
      references: User,
      key: 'id'
    },
    mealId: {
      type: DataTypes.INTEGER,
      references: Meal,
      key: 'id'
    },
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.hasOne(Meal, foreignKey: 'mealId');
        this.hasOne(User, foreignKey: 'userId');
      }
    }
  });
  return UserMeal;
};