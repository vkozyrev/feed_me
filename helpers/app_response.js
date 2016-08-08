'use strict'

var _ = require('lodash'),

module.exports = {
  createResponse = function(options) {
    var defaultOptions = {
      status: 200,
      statusText: 'OK',
      data: null,
      errors: null
    }

    return _.defaults(options || {}, defaultAttachOptions);
  };

  createResponseOK = function (data) {
    return createResponse({ data: data });
  };

  createResponseError = function (code, error) {
    return createResponse({
      status: code,
      statusText: 'INTERNAL ERROR',
      errors: [ error ]
    });
  };

  createResponseErrors = function (code, errors) {
    return createResponse({ 
      status: code,
      statusText: 'INTERNAL ERROR',
      errors: errors
    });
  };
};
