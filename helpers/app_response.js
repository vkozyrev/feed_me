'use strict'

var _ = require('lodash');

module.exports = {
  createResponse: function (options) {
    var defaultOptions = {
      status: 200,
      statusText: 'OK',
      data: null,
      errors: null
    }

    return _.defaults(options || {}, defaultOptions);
  },
  createResponseOK: function (data) {
    return this.createResponse({ data: data });
  },
  createResponseError: function (code, error) {
    return this.createResponse({
      status: code,
      statusText: 'INTERNAL ERROR',
      errors: [ error ]
    });
  },
  createResponseErrors: function (code, errors) {
    return this.createResponse({ 
      status: code,
      statusText: 'INTERNAL ERROR',
      errors: errors
    });
  }
};
