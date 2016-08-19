'use strict'

var AppError = require('./app_error');

// Model Errors

// Controller Errors
exports.loginFailed = function () {
  return new AppError({ type: 'Login_Failed'});
};