/*@ngInject*/
module.exports = function ($rootScope, $scope, $templateCache, router, settings, chatService, modal, util, camera, toast) {

  var chat    = router.getF7pageQuery($scope.f7page);
  var data    = {
    chat: chat,
    text: '',
    limitTo: 0
  };
  $scope.data = data;

  var $scroll          = $$($scope.f7page.container).find('[infinite-scroll]');
  var $list            = $scroll.find('.chat-message-list');
  //var compile_messages = Template7.compile($templateCache.get('chat-message-t7.html'));

  var events = [{
    event: 'click',
    selector: '.list-item .item-subtitle img',
    element: $list,
    handler: function (e) {
      var $images      = $list.find('.list-item .item-subtitle img');
      var photos       = [];
      var target_src   = e.target.getAttribute('src');
      var target_index = 0;
      $images.each(function (i, ele) {
        var src = ele.getAttribute('src');
        if (src === target_src) target_index = i;
        photos.push(src);
      });
      modal.createPhotoBrowser({
        photos: photos,
        initialSlide: target_index
      }).open();
    }
  }];

  util.bindEvents(events);

  $scope.$on('$destroy', function () {
    util.unbindEvents(events);
  });

  $scope.loadMore = function () {
    if (data.isEnd) return false;
    var scrollBottom = $scroll[0].scrollHeight - $scroll.scrollTop();
    data.limitTo -= settings.page_size_sm;
    var min = - chat.messages.length;
    data.limitTo = data.limitTo > min ? data.limitTo : min;
    data.isEnd = data.limitTo === min;
    $scope.$digest();
    $scroll.scrollTop($scroll[0].scrollHeight - scrollBottom);
  };

  $scope.toggleInputActions = function () {
    $scope.inputActionsVisiable = !$scope.inputActionsVisiable;
  };

  $scope.sendImageByCamera = function () {
    camera.getPicture().then(sendImage, function (err) {
      toast.error('获取图片失败：' + err.msg);
    });
  };

  $scope.sendImageByLibrary = function () {
    camera.getPicture({sourceType: 0}).then(sendImage, function (err) {
      toast.error('获取图片失败：' + err.msg);
    });
  };

  function sendImage(uri) {
    chatService.sendMessage({
      content: uri,
      type: 'image',
      chat_id: data.chat.id
    });
  }

  $scope.sendText = function () {
    chatService.sendMessage({
      content: data.text,
      chat_id: data.chat.id
    }).then(function () {
      data.text = '';
    }, function (err) {
      toast.error('消息发送失败' + err.msg);
    });
  };

  setTimeout($scope.loadMore, 1000);

};