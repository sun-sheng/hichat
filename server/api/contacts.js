var _    = require('lodash');
var User = require("../services/User");

exports.find = function (req, res) {
  var query = req.query;
  var ids = req.user.contact_ids;
  query.id = {$in: ids};
  User.find(query).then(function (users) {
    res.json(users);
  }, function (err) {
    res.json(err.code, err.message);
  });
};