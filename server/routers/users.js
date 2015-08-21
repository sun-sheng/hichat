var _    = require('lodash');
var User = require("../services/User");

module.exports = function (app) {
  app.post('/users/login', function (req, res) {
    res.json({
      user: User.fake({nickname: req.query.username}),
      token: '8949d4f6-ge46-4ccd-j873did73',
      expired_time: Date.now() + 24 * 60 * 60 * 1000
    });
  });
  app.post('/users/logout', function (req, res) {
    res.json('success');
  });
  app.get('/users/password/reset', function (req, res) {
    res.json('success');
  });

  app.post('/users/password/change', function (req, res) {
    res.json('success');
  });
};