module.exports = angular.module(
  'module.chat', []
).controller(
  'chatMainCtrl', require('./chatMainCtrl')
).controller(
  'chatDetailCtrl', require('./chatDetailCtrl')
).factory(
  'chatService', require('./chatService')
).name;