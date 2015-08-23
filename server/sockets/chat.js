var OnlineUser = require('../services/OnlineUser');
var Chat       = require('../services/Chat');
var Message    = require('../services/Message');
var _          = require('lodash');

var memory_messages = [];

module.exports = function (socket) {
  socket.on('register', function (user_id) {
    var user = OnlineUser.get(user_id);
    if (!user) return false;
    user.socket = socket;
    var messages = _.where(memory_messages, {receiver_id: user.id});
    user.socket.emit('messages', messages);
  });
  socket.on('message', function (message) {
    var chat_id = message.chat_id;
    //查找到 chat 对象
    Chat.get(chat_id).then(function (chat) {
      var user_ids = chat.user_ids;
      var messages = [];
      _.each(user_ids, function (user_id) {
        var item = _.clone(message);
        item.receiver_id = user_id;
        messages.push(item);
        Message.create(messages).then(function (messages) {
          _.each(messages, function (message) {
            var user = OnlineUser.get(message.user_id);
            memory_messages.push(message);
            if (user && user.socket) user.socket.emit('message', item);
          });
        });
      });
    });
  });
  socket.on('message:received', function (message_id) {
    _.remove(memory_messages, {id: message_id});
  });
  socket.on('messages:received', function (message_ids) {
    _.each(message_ids, function (message_id) {
      _.remove(memory_messages, {id: message_id});
    });
  });
  return socket;
};