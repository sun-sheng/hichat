var mod = angular.module(
    'lang', []
).factory(
    'lang.zh-cn', require('./zh-cn')
);

module.exports = mod.name;