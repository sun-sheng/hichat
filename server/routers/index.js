var fs         = require('fs');
var files      = fs.readdirSync(__dirname);
exports.routes = files.reduce(function (memo, file) {
  if (file !== 'index.js') {
    memo.push(require(__dirname + '/' + file));
  }
  return memo;
}, []);

exports.loadRoute = function (app) {
  exports.routes.forEach(function (route) {
    route(app);
  })
};