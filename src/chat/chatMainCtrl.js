/*@ngInject*/
module.exports = function ($scope, settings, chatService, modal, toast) {

  var loading = false;

  $scope.refresh = function () {
    if (loading) return false;
    loading = true;
    modal.showIndicator();
    chatService.fetch().then(function (chats) {
      $scope.chats = chats;
    }, function (err) {
      toast.error('获取聊天信息失败：' + err.msg);
    }).finally(function () {
      loading = false;
      modal.hideIndicator();
    });
  };

};