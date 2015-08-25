/*@ngInject*/
module.exports = function ($rootScope, $http, $q, $forage, settings, constants, util) {

  function getChatKey(chat_id) {
    return constants.FORAGE_KEY.CHAT_PREFIX + chat_id + constants.FORAGE_KEY.CHAT_POSTFIX;
  }

  function createChat(message) {
    return {
      id: message.chat_id,
      name: '',
      icon: '',
      messages: [message],
      unread: 1,
      user_ids: [$rootScope.currentUser.id, message.user_id]
    };
  }

  function convertMessage(message) {
    if (message.type === 'image') {
      message.content_html = util.replace('<img src="$1" />', message.content);
    } else if (message.type === 'link') {
      message.content_html = util.replace('<a href="$1">$1</a>', message.content);
    } else {
      message.content_html = message.content;
    }
    return message;
  }

  function saveMessage(message) {
    convertMessage(message);
    var chat = CHATS[message.chat_id];
    $q.when(chat).then(function (chat) {
      if (chat) return chat;
      return $q.reject();
    }).then(function (chat) {
      if (message.user_id === $rootScope.currentUser.id) {
        var index = _.findLastIndex(chat.messages, {client_id: message.client_id});
        if (index !== -1) chat.messages[index] = message;
      } else {
        chat.messages.push(message);
        chat.unread++;
        $rootScope.ui.unreadMessagesCount++;
      }
      return chat;
    }).then(function (chat) {
      var forage_key = getChatKey(chat.id);
      $forage.set(forage_key, chat);
    });
  }

  var socket;

  var CHATS = {};

  var service = {

    init: function () {
      socket = io(settings.chatSocket);
      socket.on('connect', function () {
        socket.emit('register', $rootScope.currentUser.access_token);
      });
      socket.on('error', function (data) {
        console.log(data);
      });
      socket.on('message', function (message) {
        saveMessage(message);
        socket.emit('message:received', message.id);
      });
      socket.on('messages', function (messages) {
        var ids = [];
        _.each(messages, function (message) {
          saveMessage(message);
          ids.push(message.id);
        });
        socket.emit('messages:received', ids);
      });
    },

    fetch: function () {
      return $http.get(settings.apiOrigin + 'chats').then(function (response) {
        return response.data;
      }, function () {
        return [];
      }).then(function (results) {
        CHATS = {};
        _.each(results, function (item) {
          item.messages = [];
        });
        return $forage.iterate(function (chat, key) {
          if (key.indexOf(constants.FORAGE_KEY.CHAT_PREFIX) !== 0) return true;
          var index = _.findIndex(results, {id: chat.id});
          if (index > -1) {
            _.assign(chat, results[index]);
            results.splice(index, 1);
            CHATS[chat.id] = chat;
          }
        }).then(function () {
          util.eachRight(results, function (chat) {
            CHATS[chat.id] = chat;
            $forage.set(getChatKey(chat.id), chat);
          });
          return CHATS;
        });
      });
    },

    load: function () {
      return $forage.iterate(function (chat, key) {
        if (key.indexOf(constants.FORAGE_KEY.CHAT_PREFIX) !== 0) return true;
        CHATS[chat.id] = chat;
      }).then(function () {
        if (_.size(CHATS) > 0) return CHATS;
        return $q.reject();
      }).catch(this.fetch);
    },

    get: function (chat_id) {
      return CHATS[chat_id];
    },

    create: function () {

    },

    remove: function () {

    },

    addUser: function () {

    },

    removeUser: function () {

    },

    sendMessage: function (message) {
      return $q(function (resolve, reject) {
        if (!(message.chat_id && message.content)) return reject({msg: '消息格式有误'});
        message.user_id    = $rootScope.currentUser.id;
        message.type       = message.type || 'text';
        message.created_at = Date.now();
        message.updated_at = message.created_at;
        //todo
        message.client_id  = message.created_at + '';
        message.sending    = true;
        var chat           = service.get(message.chat_id);
        socket.emit('message', message);
        chat.messages.push(convertMessage(message));
        resolve();
      });
    },

    fetchMessages: function (chat_id) {
      return $http.get(settings.apiOrigin + 'messages', {
        params: {
          chat_id: chat_id,
          receiver_id: $rootScope.currentUser.id
        }
      }).then(function (response) {
        var messages  = response.data;
        _.each(messages, convertMessage);
        var chat      = service.get(chat_id);
        chat.messages = messages;
        return $forage.set(getChatKey(chat_id), chat).then(function (chat) {
          CHATS[chat.id] = chat;
          return chat;
        });
      });
    }

  };
  return service;
};