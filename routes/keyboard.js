var express = require('express');
var router = express.Router();
var db = require('./database');

/* GET users listing. */
router.get('/', (req, res, next) => {
  var ans = new keyboard("buttons",["시작하기"]);
  res.json(ans);
});

module.exports = router;

function keyboard(type,buttons){
  if (type == "buttons"){
    this.type="buttons";
    this.buttons=buttons;
  }
  else if (type =="text"){
    this.type="text";
  }
}