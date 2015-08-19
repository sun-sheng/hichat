var mod = angular.module(
    'directives', []
).directive(
    'infiniteScroll', require('./infiniteScroll')
).directive(
    'pullToRefresh', require('./pullToRefresh')
).directive(
    'customValid', require('./customValid')
).directive(
    'lazySrc', require('./lazySrc')
).directive(
    'navbar', require('./navbar')
).directive(
    'f7route', require('./f7route')
);
module.exports = mod.name;