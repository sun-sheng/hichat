var OnlineUser = require('../services/OnlineUser');

exports.auth = function (req, res, next) {
  var access_token = req.get('ACCESS-TOKEN');
  console.log(access_token);
  var user = OnlineUser.findWhere({access_token: access_token});
  if (!user) return res.json(401, '用户认证失败');
  req.user = user;
  next();
};