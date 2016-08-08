'use strict'

var express = require('express');
var registerController = require('../controllers').register
var router = express.Router();
var validate = require('express-validation');
var validation = require('../test/validation');

router.route('/register')
.get(function(req, res, next) {
  res.json({ Page: "GET Register"});
})
.post(validate(validation.register.post), registerController.postRegister);

router.route('/login')
.get(function(req, res, next) {
  res.json({ Page:'GET Login' });
})
.post(function(req, res, next) {
  res.json({ Page: 'POST Login' });
});

router.route('/logout')
.post(function (req, res, next) {
  res.json({ Page: 'POST logout' });
});


module.exports = router;