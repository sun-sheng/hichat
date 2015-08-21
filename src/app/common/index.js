module.exports = angular.module(
  'app.common', []
).factory(
  'commonService', require('./commonService')
).controller(
  'feedbackCtrl', require('./feedbackCtrl')
).controller(
  'settingsCtrl', require('./settingsCtrl')
).name;