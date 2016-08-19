'use strict'

var AppError = require('./app_error');

// Model Errors
exports.usernameTaken = function () {
  return new AppError({ type: 'Username_Taken' });
};

exports.emailTaken = function () {
  return new AppError({ type: 'Email_Taken' });
};

exports.passwordMismatch = function () {
  return new AppError({ type: 'Password_Mismatch' })
};

// Controller Errors