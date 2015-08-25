module.exports = angular.module(
  'app.lang', []
).factory(
  'lang.zh-cn', require('./zh-cn')
).name;