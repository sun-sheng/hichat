/*@ngInject*/
module.exports = function ($rootScope, constants, settings) {
  function listenEvent(socket) {
    socket.on(constants.EVENT_NAME.DIALOGUE, function (data) {
      $rootScope.$broadcast(constants.EVENT_NAME.DIALOGUE, data)
    });
    socket.on(constants.EVENT_NAME.DIALOGUES, function (data) {
      $rootScope.$broadcast(constants.EVENT_NAME.DIALOGUES, data)
    });
  }

  var hasInitOnce = false;

  var svr = {
    init: function () {
      this.initOnce();
      this.socket = io(settings.socketUrl);
      listenEvent(this.socket);
    },
    initOnce: function () {
      if (hasInitOnce) return;
      $rootScope.$on('resume', function () {
        //先判断socket 是否断开，否则重新链接
        //svr.init();
      });
      hasInitOnce = true;
    },
    emit: function (msg) {
      this.socket.emit(msg.event, msg.data);
    }
  };
  return svr;
};