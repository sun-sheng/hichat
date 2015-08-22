var _    = require('lodash');
var User = require("../services/User");

exports.find = function (req, res) {
  User.find(req.query).then(function (users) {
    res.json(users);
  }, function (err) {
    res.json(err.code, err.message);
  });
};