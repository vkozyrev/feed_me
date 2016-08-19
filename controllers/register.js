'use strict'

// Services
var Promise = require('bluebird')

// Requires
  , AppResponse = require('../helpers/app_response')
  , AppErrors = require('../errors')

// Models
  , User = require('../models').User;

module.exports = {
  postLogin: function (req, res, next) {
    var scope = { user: null }

    User.findOne({ where: { email: req.body.email }})
    .then(function (user) {
      if (!user) {
        throw new AppErrors.LoginFailedError();
      }
      scope.user = user;
    })
    .then(function () {
      return scope.user.comparePassword(req.body.password);
    })
    .then(function () {
      return scope.user.generateToken();
    })
    .then(function (token) {
      res.status(200).json(AppResponse.createResponseOK({ token: token, user: scope.user.filter() }));
    })
    .catch(function (error) {
      // Don't show what caused login fail
      if (error instanceof AppErrors.AppError) {
        return next(new AppErrors.LoginFailedError());
      }
      next(error);
    });
  },
  postRegister: function (req, res, next) {
    var user = User.build({
      username: req.body.username.toLowerCase(),
      displayUsername: req.body.username,
      email: req.body.email
    });

    user.register(req.body.password)
    .then(user.save)
    .then(user.generateToken)
    .then(function (token) {
      res.status(200).json(AppResponse.createResponseOK({ token: token, user: this.filter() }));
    })
    .catch(function (error) {
      next(error);
    });
  }
};