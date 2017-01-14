'use strict';

var Joi = require('joi')
  //<TODO> Once we have more regex/global definitions, pull it into central file
  , passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = {
  register: {
    post: {
      options: { allowUnknownBody: false },
      body: {
        username: Joi.string().required().alphanum().min(6).max(20),
        email: Joi.string().required().email(),
        // Minimum 8 characters at least 1 Alphabet and 1 Number
        password: Joi.string().required().regex(passwordRegex, 'minimum 8 characters, at least 1 Alphabet and 1 Number')
      }
    }   
  },
  login: {
    post: {
      options: { allowUnknownBody: false },
      body: {
        email: Joi.string().email().required(),
        // different so that almost any password can be valid input (maybe change to same as above later)
        password: Joi.string().required().regex(passwordRegex, 'minimum 8 characters, at least 1 Alphabet and 1 Number')
      }
    }
  }
};