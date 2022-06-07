var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({message: 'Hello World'});
});

// POST method route
router.post('/', (req, res) => {
  res.send({
    data : req.body,
  })
});

module.exports = router;
