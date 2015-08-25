module.exports = angular.module(
  'module.contact', []
).controller(
  'contactListCtrl', require('./contactListCtrl')
).controller(
  'contactDetailCtrl', require('./contactDetailCtrl')
).factory(
  'contactService', require('./contactService')
).name;