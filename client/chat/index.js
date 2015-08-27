module.exports = angular.module(
  'module.chat', []
).controller(
  'chatMainCtrl', require('./chatMainCtrl')
).controller(
  'chatDetailCtrl', require('./chatDetailCtrl')
).controller(
  'chatConfigCtrl', require('./chatConfigCtrl')
).factory(
  'chatService', require('./chatService')
).name;