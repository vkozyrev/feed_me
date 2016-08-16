'use strict'

// Services
var Promise = require('bluebird')

// Requires
  , AppResponse = require('../helpers/app_response');

// Models
var User = require('../models').User;

module.exports = {
  postLogin: function (req, res, next) {
    var scope = { user: null }

    User.findOne({ where: { email: req.body.email }})
    .then(function (user) {
      scope.user = user;
    })
    .then(function () {
      return scope.user.comparePassword(req.body.password);
    })
    .then(function () {
      return scope.user.generateToken();
    })
    .then(function (token) {
      res.status(200).send(AppResponse.createResponseOK({ token: token, user: scope.user.filter() }));
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
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
      res.status(200).send(AppResponse.createResponseOK({ token: token, user: this.filter() }));
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    });
  }
};