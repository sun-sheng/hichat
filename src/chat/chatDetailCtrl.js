/*@ngInject*/
module.exports = function ($scope, settings, chatService, modal, toast) {
  var loading = false;
  var chat    = $scope.f7page.query;
  var data    = {
    chat: chat,
    sending: false,
    limitTo: - settings.page_size
  };
  $scope.data = data;

  $scope.loadMore = function () {
    if (loading || data.limitTo < - data.results.length) return false;
    data.limitTo -= settings.page_size;
    data.limitTo = data.limitTo > - data.results.length ? data.limitTo : - (data.results.length - 1);
    $scope.$digest();
  };

  $scope.sendMessage = function () {
    if (data.sending) {
      toast.info('正在发送中，请稍后');
      return false;
    }
    data.sending = true;
    chatService.sendMessage().then(function () {
      toast.success('消息发送成功');
    }, function (err) {
      toast.error('消息发送失败：' + err.msg);
    }).finally(function () {
      data.sending = false;
    });
  };

};