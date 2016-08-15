'use strict'

var passport = require('passport')
  , Promise = require('bluebird');

var User = require('../models').User;

module.exports = {
  postRegister: function (req, res, next) {
    var user = User.build({
      username: req.body.username.toLowerCase(),
      displayUsername: req.body.username
    });

    user.register(req.body.password)
    .then(user.save)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    });
  }
};