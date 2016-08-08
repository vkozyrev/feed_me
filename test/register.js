'use strict';

var validation = require('express-validation')
, app = require('../app')
, assert = require('chai').assert
, request = require('supertest');

describe('Test /register', function () {
  describe('Test input validation', function () {
    var testData = [
    { describe: 'when the request has multiple missing items in payload',
      it: 'should return a 400 ok response and 3 errors',
      errorsLength: 3,
      payload: {
        username: '',
        email: '',
        password: '' 
      }
    },
    { describe: 'when the request has 1 missing item in payload',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: '' 
      }
    },
    { describe: 'when username too short',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'test6',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when username is too long',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testingtestingtesting',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when username has illegal characters',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing_',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when given invalid email',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing',
        email: 'testsomemail.com',
        password: 'testing1' 
      }
    },
    { describe: 'when given too short password',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testing' 
      }
    },
    { describe: 'when given password with no letters',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: '123456789' 
      }
    },
    { describe: 'when given password with no numbers',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testtest' 
      }
    }];

    testData.forEach(function (testCase) {
      describe(testCase.describe, function () {
        it(testCase.it, function (done) {
          request(app)
          .post('/register')
          .send(testCase.payload)
          .expect(400)
          .end(function (err, res) {
            var response = JSON.parse(res.text);
            //console.log(JSON.stringify(res.text, null, 2));
            assert.equal(testCase.errorsLength, response.errors.length);
            done();
          });
        });
      });
    });
  });
  /*
  describe('Test registration controller', function () {
    var testData = [
    { describe: 'when the request has multiple missing items in payload',
      it: 'should return a 400 ok response and 3 errors',
      errorsLength: 3,
      payload: {
        username: '',
        email: '',
        password: '' 
      }
    }];
  });
  */
});
