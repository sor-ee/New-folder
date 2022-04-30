var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', [
  check("user","").not().isEmpty(),
  check("pass","").not().isEmpty()
], function(req,res,next) {
  const answer = validationResult(req);
  if(!answer.isEmpty()) {
    res.location('/');
    res.redirect('/');
  }
  else{
    var check = db.get('user');
    check.find({$and:[{username:req.body.user},{password:req.body.pass}]}).then((result) => {
      if(result.length== 0) {
        res.location('/');
        res.redirect('/');
    }
      else if (req.body.pass=="1234"){
        res.location('/borrow');
        res.redirect('/borrow');
      }
      else {
        res.location('/home');
        res.redirect('/home');
    }
  });
  }
});

module.exports = router;
