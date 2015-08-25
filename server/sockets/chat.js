var OnlineUser = require('../services/OnlineUser');
var User       = require('../services/User');
var Chat       = require('../services/Chat');
var Message    = require('../services/Message');
var _          = require('lodash');
var Q          = require('q');

var memory_messages = [];

module.exports = function (socket) {

  socket.on('register', function (access_token) {
    Q.fcall(function () {
      var user = OnlineUser.findWhere({access_token: access_token});
      if (user) return user;
      return Q.reject();
    }).fail(function () {
      return User.findOne({access_token: access_token}).then(function (user) {
        if (user.access_expired_at < Date.now()) return Q.reject();
        return user;
      });
    }).then(function (user) {
      user.socket = socket;
      OnlineUser.add(user);
      console.log('register access_token is : ' + user.access_token);
      var messages = _.where(memory_messages, {receiver_id: user.id});
      user.socket.emit('messages', messages);
    }, function (err) {
      console.log(err);
    });
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
        //set sending false
        item.sending = false;
        messages.push(item);
      });
      Message.create(messages).then(function (messages) {
        _.each(messages, function (message) {
          var user = OnlineUser.get(message.receiver_id);
          if (user && user.socket) user.socket.emit('message', message);
          //缓存未发送出的 messages
          //memory_messages.push(message);
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