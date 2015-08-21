/*@ngInject*/
module.exports = function ($scope, $rootScope, router, userService, modal, toast) {
  var loading   = false;
  $scope.logout = function () {
    if (loading) {
      return false;
    }
    modal.confirm('确认退出吗？', function () {
      loading = true;
      modal.showIndicator();
      userService.logout().then(function () {
        $rootScope.notSaveEveActiveTabIndex = true;
        router.reload();
      }, function (err) {
        toast.err('退出失败：' + err.msg);
      }).finally(function () {
        loading = false;
        modal.hideIndicator();
      });
    });
  }
};