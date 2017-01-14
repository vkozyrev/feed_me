'use strict';
module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    minMeals: DataTypes.INTEGER,
    maxMeals: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.User, { through: 'UserMeals' });
      }
    }
  });
  return Meal;
};