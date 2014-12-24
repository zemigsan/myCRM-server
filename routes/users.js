var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST

/* POST /clients */
router.post('/',function(req, res, next) {
 var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!' });
  });
});

// Create endpoint /api/users for GET
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});

module.exports = router;
