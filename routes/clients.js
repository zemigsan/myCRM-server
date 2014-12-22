var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Client = require('../models/Client.js');

/* GET /clients listing. */
router.get('/', function(req, res, next) {
  Client.find(function (err, clients) {
    if (err) return next(err);
    res.json(clients);
  });
});


/* POST /clients */
router.post('/', function(req, res, next) {
  Client.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log(req.body);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
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