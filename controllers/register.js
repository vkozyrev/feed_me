'use strict'

var passport = require('passport');

var User = require('../models').User;

module.exports = {
  postRegister: function (req, res, next) {
    var user = User.build({
      username: req.body.username.toLowerCase(),
      displayUsername: req.body.username
    });
    User.register(user, req.body.password, function (error, user) {
      if (error) {
        return next(error);
      }
      passport.authenticate('local')(req, res, function () {
        res.send(200, user.attributes);
      });
    });
  }
};