var mod = angular.module(
    'module.common', []
).factory(
    'commonService', require('./commonService')
);

module.exports = mod.name;