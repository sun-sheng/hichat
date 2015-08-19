var mod = angular.module(
    'module.user', []
).controller(
    'userLoginCtrl', require('./userLoginCtrl')
).controller(
    'userResetPasswordCtrl', require('./userResetPasswordCtrl')
).controller(
    'userChangePasswordCtrl', require('./userChangePasswordCtrl')
).controller(
    'userVerifyCtrl', require('./userVerifyCtrl')
).controller(
    'userMainCtrl', require('./userMainCtrl')
).controller(
    'userInfoCtrl', require('./userInfoCtrl')
).controller(
    'userCheckinCtrl', require('./userCheckinCtrl')
).factory(
    'userService', require('./userService')
);
module.exports = mod.name;
