var express = require('express');
var router = express.Router();
var handler = require('../handler/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  handler.login(req, res, next);
});

router.post('/register', function(req, res, next) {
  handler.register(req, res, next);
});

router.post('/update', function(req, res, next) {
  handler.update(req, res, next);
});

module.exports = router;
