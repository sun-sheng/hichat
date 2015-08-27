var OnlineUser = require('../services/OnlineUser');
var User       = require('../services/User');
var Q          = require('q');

exports.auth = function (req, res, next) {
  var access_token = req.get('ACCESS-TOKEN');
  console.log(access_token);
  var user = OnlineUser.findWhere({access_token: access_token});
  if (user) {
    req.user = user;
    next();
    return true;
  }
  User.findOne({access_token: access_token}).then(function (user) {
    if (user.access_expired_at < Date.now()) return Q.reject();
    return user;
  }).then(function (user) {
    req.user = user;
    OnlineUser.add(user);
    next();
  }, function () {
    return res.json(401, '用户认证失败');
  });
};