/*@ngInject*/
module.exports = function ($rootScope, $scope, $http, settings, constants, router, userService, modal, toast) {

  $scope.loading = false;
  $scope.user    = {
    email: '',
    password: ''
  };
  $http.get(settings.apiOrigin + 'users/nicknames').then(function (response) {
    $scope.nicknames   = response.data;
    $scope.initialized = true;
    $scope.randomUser();
  });

  $scope.randomUser = function () {
    var nickname         = _.sample($scope.nicknames);
    $scope.user.email    = nickname;
    $scope.user.password = nickname;
    //if (digest) $scope.$digest();
  };

  $scope.login = function () {
    $scope.loading = true;
    var user       = {
      email: $scope.user.email + settings.user_email_postfix,
      password: $scope.user.password
    };
    userService.login(user).then(function (user) {
      router.afterLogin(user);
    }, function (err) {
      toast.error('登录失败：' + err.msg);
    }).finally(function () {
      $scope.loading = false;
    });
  };
};