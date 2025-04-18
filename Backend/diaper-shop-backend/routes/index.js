var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hey there this is house if diapers ");
});

module.exports = router;
