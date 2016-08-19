'use strict'

var AppError = require('./app_error').AppError
  , util = require('util');

exports.LoginFailedError = LoginFailedError;
function LoginFailedError() {
  AppError.call(this, { type: 'Login_Failed' });
};
util.inherits(LoginFailedError, AppError);