'use strict'

var _ = require('lodash');

module.exports = {
  createResponse: function (options) {
    var defaultOptions = {
      status: 200,
      data: null,
      error: null
    }

    return _.defaults(options || {}, defaultOptions);
  },
  createResponseOK: function (data) {
    return this.createResponse({ data: data });
  },
  createResponseError: function (code, error) {
    return this.createResponse({
      status: code,
      error: error
    });
  }
};
