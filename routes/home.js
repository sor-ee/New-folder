var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
module.exports = router;