// Services
// Requires
var sequelize = require('../models').sequelize

// Models and Controllers
  , User = require('../models').User;

module.exports = {
  User: {
    clearUserDatabase: function () {
      return sequelize.query('DELETE FROM Users;')
      .catch(function (error) {
        assert.fail(error, null, 'Database Error');
      })
    },
    createTestUser: function (input) {
      var user = User.build({
        username: input.username.toLowerCase(),
        displayUsername: input.username,
        email: input.email
      });
      return user.register('testtest1').then(user.save);
    }
  }
};