/*@ngInject*/
module.exports = function ($scope, settings, chatService, modal, toast) {

  var loading = false;
  var data = {};
  $scope.data = data;

  $scope.load = function () {
    if (loading) return false;
    loading = true;
    modal.showIndicator();
    chatService.load().then(function (chats) {
      data.chats = chats;
      data.isEmpty = chats.length === 0;
      _.each(chats, function (chat) {
        if (chat.messages.length === 0) fetchMessages(chat);
      });
    }, function (err) {
      toast.error('获取聊天信息失败：' + err.msg);
    }).finally(function () {
      loading = false;
      modal.hideIndicator();
    });
  };

  $scope.refresh = function () {

  };

  function fetchMessages (chat) {
    return chatService.fetchMessages(chat.id);
  }

};