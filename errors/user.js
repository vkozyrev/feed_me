'use strict'

var AppError = require('./app_error').AppError
  , util = require('util');

exports.EmailTakenError = EmailTakenError;
function EmailTakenError() {
  AppError.call(this, { type: 'Email_Taken', status: 400 });
};
util.inherits(EmailTakenError, AppError);

exports.PasswordMismatchError = PasswordMismatchError;
function PasswordMismatchError() {
  AppError.call(this, { type: 'Password_Mismatch', status: 400 });
};
util.inherits(PasswordMismatchError, AppError);

exports.UsernameTakenError = UsernameTakenError;
function UsernameTakenError() {
  AppError.call(this, { type: 'Username_Taken', status: 400 });
};
util.inherits(PasswordMismatchError, AppError);
