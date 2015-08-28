var _    = require('lodash');
var User = require('../services/User');

exports.create = function (req, res) {
  User.create(req.body).then(function (user) {
    res.json(user);
  }, function (err) {
    res.json(err.code, err.message);
  })
};

exports.update = function (req, res) {
  var user = req.body;
  user.id  = user.id || req.params.user_id;
  User.update(user).then(function (user) {
    res.json(user);
  }, function (err) {
    res.json(err.code, err.message);
  })
};

exports.login = function (req, res) {
  User.login(req.body).then(function (user) {
    res.json(user);
  }, function (err) {
    res.json(err.code, err.message);
  });
};

exports.logout = function (req, res) {
  User.logout(req.user);
  res.json('success');
};

exports.findNicknames = function (req, res) {
  User.find().then(function (users) {
    var names = [];
    _.each(users, function (user) {
      names.push(user.nickname);
    });
    res.json(names);
  }, function (err) {
    res.json(err.code, err.message);
  });
};