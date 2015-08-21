//
moment.locale('zh-cn');
//framework7 提供的 Dom7
window.$$ = Dom7;
//
window.$$document = $$(document);
//
window.$$body = $$('body');

//定义ng-app
angular.module(
  'app',
  [
    'ngAnimate',
    'ngSanitize',
    'ngForage',
    //
    require('./app/lang/'),
    //加载 组件类模块
    require('./app/components/'),
    //加载 指令
    require('./app/directives/'),
    require('./app/common/'),
    //加载 所有业务的模块
    require('./contact/'),
    require('./chat/'),
    require('./user/')
  ]
).factory(
  'i18n', require('./app/i18n')
).factory(
  'router', require('./app/router')
).constant(
  'settings', require('./app/settings')
).constant(
  'constants', require('./app/constants')
).config(
  require('./app/config')
).run(
  require('./app/run')
);