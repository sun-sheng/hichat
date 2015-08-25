/*@ngInject*/
module.exports = function ($scope, $templateCache, settings, chatService, contactService, modal, util, camera, toast) {

  var loading = false;
  var chat    = $scope.f7page.query;
  var data    = {
    chat: chat,
    text: '',
    limitTo: - settings.page_size_sm
  };

  var $list = $$($scope.f7page.container).find('.chat-message-list');

  var compile_messages = Template7.compile($templateCache.get('chat-message-t7.html'));

  var events = [{
    event: 'click',
    selector: '.list-item .item-subtitle img',
    element: $list,
    handler: function (e) {
      var $images = $list.find('.list-item .item-subtitle img');
      var photos = [];
      var target_src = e.target.getAttribute('src');
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

  contactService.load().then(function (contacts) {
    data.users = {};
    _.each(contacts, function (contact) {
      data.users[contact.id] = contact;
    });
    $scope.data = data;

  });

  $scope.loadMore = function () {
    if (loading || data.limitTo < - data.chat.messages.length) return false;
    data.limitTo -= settings.page_size_sm;
    data.isEnd = data.limitTo < - data.chat.messages.length;
    if (data.isEnd) {
      data.limitTo = - data.chat.messages.length;
    }
    $scope.$digest();
  };

  $scope.toggleInputActions = function () {
    $scope.inputActionsVisiable = ! $scope.inputActionsVisiable;
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

  function sendImage (uri) {
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

};