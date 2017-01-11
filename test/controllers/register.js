'use strict';

// <TODO> Move this to controller test folder

// Services
var Promise = require('bluebird')
  , app = require('../../app')
  , assert = require('chai').assert
  , httpMocks = require('node-mocks-http')
  , request = require('supertest-as-promised')
  , testUtils = require('../test_utils')
  , validation = require('express-validation')
  
// Requires
  , sequelize = require('../../models').sequelize

// Models and Controllers
  , User = require('../../models').User
  , registerController = require('../../controllers').register;

describe('Test registration controller', function () {

  beforeEach('Clear User Database', testUtils.User.clearUserDatabase);

  describe('/register input validation', function () {
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
        it (testCase.it, function () {
          return request(app)
          .post('/register')
          .send(testCase.payload)
          .expect(testCase.responseCode)
          .then(function (res) {
            var response = JSON.parse(res.text);
            if (testCase.statusText === 'Validation_Error') { assert.equal(testCase.error.errorsLength, response.error.errors.length); }
          })
          .catch(function (error) {
            assert.ifError(error);
          })
        });
      });
    });
  });

  describe('/register controller', function () {
    // <TODO> make a generic test function and pull out test data
    // <TODO> most controller tests simply take a req res next, potentially all controller tests can
    // be abstracted out to a single function if the test data definition is correctly created

    it('should return EmailTakenUser when given existing email', function () {
      


      /*
      var payload = {
        username: 'testtest',
        email: 'testtest@gmail.com',
        password: 'testtest1'
      };

      return Promise.resolve({ username: 'testtest', email: 'testtest@gmail.com' })
      .then(createTestUser)
      .then(function (user) {
        console.log("Test Username: " + user.username);
        return request(app);
      })
      .then(function (requestApp) {
        return requestApp.post('/register').send(payload).expect(400);
      })
      .then(function (res) {
        console.log(res.body);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
      */
    });

    it('should return UsernameTakenError when given existing username', function () {
      var payload = {
        username: '',
        email: '',
        password: ''
      };
    });

    it('should return OK with token and user objects when given valid data', function () {
      var payload = {
        username: '',
        email: '',
        password: ''
      };
    });
  });

  describe('/login intput validation', function () {

  });

  describe('/login controller', function () {

  });

  afterEach('Clear User Database', function () {
    return sequelize.query('DELETE FROM Users;')
    .catch(function (error) {
      assert.fail(error, null, 'Database Error');
    })
  });
});
