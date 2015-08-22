var fs         = require('fs');
var files      = fs.readdirSync(__dirname);
var routes = files.reduce(function (memo, file) {
  if (file !== 'index.js') {
    memo.push(require(__dirname + '/' + file));
  }
  return memo;
}, []);

exports.route = function (app) {
  routes.forEach(function (route) {
    route(app);
  });
};