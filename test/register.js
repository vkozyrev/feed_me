'use strict';

var validation = require('express-validation')
, app = require('../app')
, assert = require('chai').assert
, request = require('supertest');

describe('validate body and flatten errors', function () {

  describe('when the request has multiple missing items in payload', function () {
    
    it('should return a 400 ok response and two errors flattened', function (done) {

      var register = {
        username: '',
        email: '',
        password: ''
      };

      request(app)
        .post('/register')
        .send(register)
        .expect(400)
        .end(function (err, res) {
          var response = JSON.parse(res.text);
          assert.equal(3, response.errors.length);
          done();
        });
    });
  });
});