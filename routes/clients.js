var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Client = require('../models/Client.js');

/* GET /clients listing. */
router.get('/', function(req, res, next) {
    console.log("asking for users with " + req.user._id);
  Client.find({ user: req.user._id },function (err, clients) {
    if (err) return next(err);
    res.json(clients);
  });
});


/* POST /clients */
router.post('/add',  function(req, res, next) {
    //adding the userid
    var newbody = req.body;
    newbody.user = req.user._id;
  Client.create(newbody, function (err, post) {
    if (err) return next(err);

    console.log(newbody);
    res.json(newbody);
  });
});

/* GET /todos/id */
router.get('/:id',  function(req, res, next) {
  Client.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;