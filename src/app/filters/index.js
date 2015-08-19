var mod = angular.module(
    'filters', []
).filter('fromNow', require('./fromNow'));

module.exports = mod.name;