var express = require('express');
var router = express.Router();
console.log("routers user文件的log")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
