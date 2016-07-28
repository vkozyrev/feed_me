'use strict';

var Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string().required().alphanum(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(10)
  }
};