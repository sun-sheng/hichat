var OnlineUser = require('../services/OnlineUser');
var Chat       = require('../services/Chat');

module.exports = function (socket) {
  socket.on('register', function (data) {
    var user = OnlineUser.get(data.user_id);
    if (user) user.socket = socket;
  });
  socket.on('message', function (message) {
    var chat_id = message.chat_id;
    //查找到 chat 对象
    Chat.addMessages(chat_id, [message]).then(function (chat) {
      var user_ids = chat.user_ids;
      _.each(user_ids, function (id) {
        var user = OnlineUser.get(id);
        if (user && user.socket) user.socket.emit('message', message);
      });
    });
  });
  return socket;
};