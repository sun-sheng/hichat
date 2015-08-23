/*@ngInject*/
module.exports = function ($scope, settings, chatService, modal, toast) {

  var loading = false;
  var data = {};
  $scope.data = data;

  $scope.refresh = function () {
    if (loading) return false;
    loading = true;
    modal.showIndicator();
    chatService.fetch().then(function (chats) {
      data.chats = chats;
      data.isEmpty = _.keys(chats).length === 0;
      _.each(chats, loadMessages);
    }, function (err) {
      toast.error('获取聊天信息失败：' + err.msg);
    }).finally(function () {
      loading = false;
      modal.hideIndicator();
    });
  };

  function loadMessages (chat) {
    return chatService.loadMessages(chat.id);
  }

};