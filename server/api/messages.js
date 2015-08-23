var _       = require('lodash');
var Message = require("../services/Message");

exports.find = function (req, res) {
  console.log(req.query);
  Message.find(req.query).then(function (messages) {
    res.json(messages);
  }, function (err) {
    res.status(err.code).json(err.message);
  })
};

exports.create = function (req, res) {
  Message.create(req.body).then(function (message) {
    res.json(message);
  }, function (err) {
    res.status(err.code).json(err.message);
  });
};

exports.remove = function (req, res) {
  Message.remove(req.params.message_id).then(function (message) {
    res.json(message);
  }, function (err) {
    res.json(err.code, err.message);
  });
};
