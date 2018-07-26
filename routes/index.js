var express = require('express');
var router = express.Router();
console.log("routers文件的log")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
