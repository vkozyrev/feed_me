'use strict';

// Services
var Promise = require('bluebird')
  , app = require('../app')
  , assert = require('chai').assert
  , httpMocks = require('node-mocks-http')
  , request = require("supertest-as-promised")
  , validation = require('express-validation')
  
// Requires
  , sequelize = require('../models').sequelize

// Models
  , User = require('../models').User;

describe('Test /register', function () {

  beforeEach('Clear User Database', function () {
    return sequelize.query('DELETE FROM Users;')
    .catch(function (error) {
      assert.fail(error, null, 'Database Error');
    })
  });

  describe('Test input validation', function () {
    var testData = [
    { describe: 'when the request has multiple missing items in payload',
      it: 'should return a 400 ok response and 3 errors',
      errorsLength: 3,
      responseCode: 400,
      payload: {
        username: '',
        email: '',
        password: '' 
      }
    },
    { describe: 'when the request has 1 missing item in payload',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: '' 
      }
    },
    { describe: 'when username too short',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'test6',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when username is too long',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testingtestingtesting',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when username has illegal characters',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing_',
        email: 'test@testing.com',
        password: 'testing1' 
      }
    },
    { describe: 'when given invalid email',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing',
        email: 'testsomemail.com',
        password: 'testing1' 
      }
    },
    { describe: 'when given too short password',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: 'test1ng' 
      }
    },
    { describe: 'when given password with no letters',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: '123456789' 
      }
    },
    { describe: 'when given password with no numbers',
      it: 'should return a 400 ok response and 1 errors',
      errorsLength: 1,
      responseCode: 400,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testtest' 
      }
    },
    { describe: 'when given valid data',
      it: 'should return a 400 ok',
      errorsLength: 0,
      responseCode: 200,
      payload: {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testtest1' 
      }
    }];

    testData.forEach(function (testCase) {
      describe(testCase.describe, function () {
        it (testCase.if, function () {
          return request(app)
          .post('/register')
          .send(testCase.payload)
          .expect(testCase.responseCode)
          .then(function (res) {
            var response = JSON.parse(res.text);
            if (testCase.errorsLength) { assert.equal(testCase.errorsLength, response.errors.length); }
          })
          .catch(function (error) {
            assert.ifError(error);
          })
        });
      });
    });
  });

  describe('Test registration controller', function () {
    
  });

  afterEach('Clear User Database', function () {
    return sequelize.query('DELETE FROM Users;')
    .catch(function (error) {
      assert.fail(error, null, 'Database Error');
    })
  });
});
