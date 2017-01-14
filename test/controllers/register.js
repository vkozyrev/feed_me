'use strict';

// <TODO> Move this to controller test folder

// Services
var Promise = require('bluebird')
  , app = require('../../app')
  , assert = require('chai').assert
  , httpMocks = require('node-mocks-http')
  , request = require('supertest')
  , testUtils = require('../test_utils')
  , validation = require('express-validation')
  
// Requires
  , sequelize = require('../../models').sequelize

// Models and Controllers
  , User = require('../../models').User
  , registerController = require('../../controllers').register;


// <TODO> A lot of duplicate code here, potentially combine later
// <TODO> Is supertest the best way to test a single controller? we are running this test through the whole stack 
//        instead of isolating just the controller
describe('Test registration controller', function () {

  beforeEach('Clear User Database', testUtils.User.clearUserDatabase);

  describe('/register input validation', function () {

    it('should return a 400 response with error type Validation_Error containing 3 items in extendedInfo when there are 3 missing items in payload', function () {
      var payload = {
        username: '',
        email: '',
        password: '' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(3, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when there is 1 missing item in payload', function () {
      var payload = {
        username: 'testing',
        email: 'test@testing.com',
        password: ''
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when username too short', function () {
      var payload = {
        username: 'test6',
        email: 'test@testing.com',
        password: 'testing1' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when username is too long', function () {
      var payload = {
        username: 'testingtestingtesting',
        email: 'test@testing.com',
        password: 'testing1' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when username has illegal characters', function () {
      var payload = {
        username: 'testing_',
        email: 'test@testing.com',
        password: 'testing1' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when given invalid email', function () {
      var payload = {
        username: 'testing',
        email: 'testsomemail.com',
        password: 'testing1' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when given too short password', function () {
      var payload = {
        username: 'testing',
        email: 'test@testing.com',
        password: 'test1ng'
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when given password with no letters', function () {
      var payload = {
        username: 'testing',
        email: 'test@testing.com',
        password: '123456789' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 400 response with error type Validation_Error containing 1 item in extendedInfo when given password with no numbers', function () {
      var payload = {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testtest' 
      };

      return request(app).post('/register').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    //<TODO>: rewrite this it
    it('should return a 200 response along with data: { user: {...}, token: {...}} when given valid input', function () {
      var payload = {
        username: 'testing',
        email: 'test@testing.com',
        password: 'testtest1' 
      };

      return request(app).post('/register').send(payload).expect(200)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.data);
        //<TODO> Probably a good idea to add a method that checks the User is saved to the database
        assert.isNotNull(response.data.user);
        assert.isNotNull(response.data.token);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });
  });

  describe('/register controller', function () {
    // <TODO> make a generic test function and pull out test data
    // <TODO> most controller tests simply take a req res next, potentially all controller tests can
    // be abstracted out to a single function if the test data definition is correctly created

    it('should return 400 response with error type Email_Taken when given existing email', function () {
      return testUtils.User.createTestUser({ username: 'testtest', email: 'testtest@gmail.com', password: 'testtest1' })
      .then(function (user) {
        return request(app).post('/register').send({ username: 'testtestNEW', email: 'testtest@gmail.com', password: 'testtest1' }).expect(400);
      })
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Email_Taken', response.error.type);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return 400 response with error type Username_Taken when given existing username', function () {
      return testUtils.User.createTestUser({ username: 'testtest', email: 'testtest@gmail.com', password: 'testtest1' })
      .then(function (user) {
        return request(app).post('/register').send({ username: 'testtest', email: 'testtestNEW@gmail.com', password: 'testtest1' }).expect(400);
      })
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Username_Taken', response.error.type);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    // it('should return OK with token and user objects when given valid data') THIS IS COVERED ABOVE
  });

  describe('/login intput validation', function () {

    it('should return 400 response with error type Validation_Error containing 2 items in extendedInfo when there are 2 missing items in payload', function () {
      var payload = {
        email: '',
        password: ''
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(2, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Validation_Error containing 1 items in extendedInfo when email is missing', function () {
      var payload = {
        email: '',
        password: 'testing1'
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Validation_Error containing 1 items in extendedInfo when password is missing', function () {
      var payload = {
        email: 'test@testing.com',
        password: ''
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Validation_Error containing 1 items in extendedInfo when email is invalid', function () {
      var payload = {
        email: 'testtesting.com',
        password: 'testing1'
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Validation_Error containing 1 items in extendedInfo when password has no letters', function () {
      var payload = {
        email: 'test@testing.com',
        password: '123456789'
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Validation_Error containing 1 items in extendedInfo when password has no numbers', function () {
      var payload = {
        email: 'test@testing.com',
        password: 'testtesting'
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Validation_Error', response.error.type);
        assert.equal(1, response.error.extendedInfo.length);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 

    it('should return 400 response with error type Login_Failed when given valid input with no matching user in database', function () {
      var payload = {
        email: 'test@testing.com',
        password: 'testing1'
      };

      return request(app).post('/login').send(payload).expect(400)
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Login_Failed', response.error.type);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    }); 
  });

  describe('/login controller', function () {

    it('should return 400 response with error type Login_Failed when given valid User email with wrong password', function () {
      return testUtils.User.createTestUser({ username: 'testtest', email: 'testtest@gmail.com', password: 'testtest1' })
      .then(function (user) {
        return request(app).post('/login').send({ email: 'testtest@gmail.com', password: 'testtest11' }).expect(400);
      })
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Login_Failed', response.error.type);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return 400 response with error type Login_Failed when given invalid User email with valid password', function () {
      return testUtils.User.createTestUser({ username: 'testtest', email: 'testtest@gmail.com', password: 'testtest1' })
      .then(function (user) {
        return request(app).post('/login').send({ email: 'testtestt@gmail.com', password: 'testtest1' }).expect(400);
      })
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.error);
        assert.equal('Login_Failed', response.error.type);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });

    it('should return a 200 response along with data: { user: {...}, token: {...}} when given valid input', function () {
      return testUtils.User.createTestUser({ username: 'testtest', email: 'testtest@gmail.com', password: 'testtest1' })
      .then(function (user) {
        return request(app).post('/login').send({ email: 'testtest@gmail.com', password: 'testtest1' }).expect(200);
      })
      .then(function (res) {
        var response = JSON.parse(res.text);
        assert.isNotNull(response.data);
        assert.isNotNull(response.data.user);
        assert.isNotNull(response.data.token);
      })
      .catch(function (error) {
        assert.ifError(error);
      });
    });
  });

  afterEach('Clear User Database', testUtils.User.clearUserDatabase);
});
