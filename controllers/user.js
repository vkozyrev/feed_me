'use strict'

// Services
var Promise = require('bluebird')

// Requires
  , AppResponse = require('../helpers/app_response');

// Models
var User = require('../models').User;

module.exports = {
  get: function (req, res, next) {
    res.status(200).json(AppResponse.createResponseOK({ user: req.user.filter()}));
  }
};