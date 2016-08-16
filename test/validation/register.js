'use strict';

var Joi = require('joi');

module.exports = {
  register: {
    post: {
      options: { allowUnknownBody: false },
      body: {
        username: Joi.string().required().alphanum().min(6).max(20),
        email: Joi.string().required().email(),
        // Minimum 8 characters at least 1 Alphabet and 1 Number
        password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "minimum 8 characters, at least 1 Alphabet and 1 Number")
      }
    }   
  },
  login: {
    post: {
      options: { allowUnknownBody: false },
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
      }
    }
  }
};