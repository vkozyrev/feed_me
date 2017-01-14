'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserMeal = sequelize.define('UserMeal', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    mealId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Meal',
        key: 'id'
      }
    },
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Meal);
        this.belongsTo(models.User);
      }
    }
  });
  return UserMeal;
};