var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Project = require('../models/Project.js');

/* GET /projects listing. */
router.get('/', function(req, res, next) {
    console.log("asking for projects for user: " + req.user._id);
  Project.find({ user: req.user._id },function (err, clients) {
    if (err) return next(err);
    res.json(clients);
  });
});

/* GET /projects/id */
router.get('/:id',  function(req, res, next) {
  Project.find({ user: req.user._id, client: req.params.id },function (err, clients) {
    if (err) return next(err);
    res.json(clients);
  });
});

/* POST /projects/add */
router.post('/add',  function(req, res, next) {
    //adding the userid
    var newbody = req.body;
    newbody.user = req.user._id;
  Project.create(newbody, function (err, post) {
    if (err) return next(err);

    console.log(newbody);
    res.json(newbody);
  });
});


module.exports = router;