'use strict'

var _ = require('lodash')
  , util = require('util');

exports.AppError = AppError;
function AppError(settings, implementationContext) {
  settings = (settings || {});
  this.name = "AppError";
  this.type = (settings.type || "Application");
  this.message = (settings.message || "An error occurred.");
  this.extendedInfo = (settings.extendedInfo || "");
  this.status = (settings.status || 500);
  Error.captureStackTrace(this, (implementationContext || AppError));
};
util.inherits(AppError, Error);

exports.FieldValidationError = FieldValidationError;
function FieldValidationError(validationErrors) {
  AppError.call(this, { type: 'Validation_Error', extendedInfo: validationErrors, status: 400 });
};
util.inherits(FieldValidationError, AppError);