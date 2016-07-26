var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(projects) {
    // projects will be an array of all Project instances
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
