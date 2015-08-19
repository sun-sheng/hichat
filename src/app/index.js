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
        require('./lang/'),
        //加载 组件类模块
        require('./components/'),
        //加载 指令
        require('./directives/'),
        //加载 所有业务的模块
        require('../common/'),
        require('../contact/'),
        require('../message/'),
        require('../user/')
    ]
).factory(
    'i18n', require('./i18n')
).factory(
    'router', require('./router')
).constant(
    'settings', require('./settings')
).constant(
    'constants', require('./constants')
).config(
    require('./config')
).controller(
    'feedbackCtrl', require('./feedbackCtrl')
).controller(
    'settingsCtrl', require('./settingsCtrl')
).run(
    require('./run')
);