'use strict'

var express = require('express');
var userController = require('../controllers').user
var passport = require('passport');
var router = express.Router();
var validate = require('express-validation');
var validation = require('../test/validation');

/* GET users listing. */
router.route('/')
.get(passport.authenticate('jwt', { session: false }), userController.get)

module.exports = router;
