var mod = angular.module(
    'module.message', []
).controller(
    'messageMainCtrl', require('./messageMainCtrl')
).controller(
    'messageDetailCtrl', require('./messageDetailCtrl')
).factory(
    'messageService', require('./messageService')
);
module.exports = mod.name;