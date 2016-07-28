'use strict'

var express = require('express');
var router = express.Router();

router.route('/register')
.get(function(req, res, next) {
  res.json({ Page: "GET Register"});
})
.post(function(req, res, next) {
  res.json({ Page: "POST Register"});
});

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