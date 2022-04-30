var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('borrow');
});
router.post('/', [
    check("borrow","").not().isEmpty(),
    check("return","").not().isEmpty(),
    check("ID","").not().isEmpty()
  ], function(req,res,next) { 
    const answer = validationResult(req);
    if(!answer.isEmpty()) {
      res.location('/borrow');
      res.redirect('/borrow');
    }
    else{
      var ct=db.get('borrow')
      ct.insert({
        product:"Panasonic GM1",
        borrowDate:req.body.borrow,
        returnDate:req.body.return,
        studentID:req.body.ID
      },function(err,home){
        if(err){
          res.send(err);
        }else{
          res.location('/home');
          res.redirect('/home');
        }
      })
      
    }
  });
module.exports = router;
