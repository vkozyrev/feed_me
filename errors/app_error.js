'use strict'

var _ = require('lodash')
  , util = require( "util" );

module.exports = AppError;

function AppError(settings, implementationContext) {
  settings = (settings || {});
  this.name = "AppError";
  this.type = (settings.type || "Application");
  this.message = (settings.message || "An error occurred.");
  this.detail = (settings.detail || "" );
  this.extendedInfo = (settings.extendedInfo || "");
  this.errorCode = (settings.errorCode || "");
  this.isAppError = true;
  Error.captureStackTrace(this, (implementationContext || AppError));
};

util.inherits(AppError, Error);