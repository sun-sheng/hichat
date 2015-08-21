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

  function convertMessage (message) {
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
      chat.messages.push(message);
      chat.unread ++;
      $rootScope.ui.unreadMessagesCount ++;
      return chat;
    }, function () {
      var chat = createChat(message);
      CHATS[chat.id] = chat;
      return chat;
    }).then(function (chat) {
      var forage_key = getChatKey(chat.id);
      $forage.set(forage_key, chat);
    });
  }

  var socket;

  var CHATS = {};

  return {

    init: function () {
      socket = io(settings.chatSocket);
      socket.emit('register', currentUser.id);
      socket.on('message', saveMessage);
      socket.on('messages', function (messages) {
        _.each(messages, saveMessage);
      });
    },

    fetch: function () {
      return $http.get(settings.apiOrigin + 'chats', function (response) {
        return response.data;
      }, function () {
        return [];
      }).then(function (results) {
        CHATS = {};
        $rootScope.ui.unreadMessagesCount = 0;
        _.each(results, function (item) {
          _.each(item.messages, convertMessage);
        });
        return $forage.iterate(function (chat, key) {
          if (key.indexOf(constants.FORAGE_KEY.CHAT_PREFIX) !== 0) return true;
          util.eachRight(results, function (item, index) {
            if (item.id !== chat.id) return true;
            chat.messages = chat.messages.contact(item.messages);
            chat.unread += item.messages.length;
            $rootScope.ui.unreadMessagesCount += chat.unread;
            results.splice(index, 1);
          });
          CHATS[chat.id] = chat;
        }, function () {
          $rootScope.ui.unreadMessagesCount = 0;
          return true;
        }).then(function () {
          util.eachRight(results, function (chat) {
            chat.unread = chat.messages.length;
            $rootScope.ui.unreadMessagesCount += chat.unread;
            CHATS[chat.id] = chat;
            $forage.set(getChatKey(chat.id), chat);
          });
          return CHATS;
        });
      });
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

    sendMessage: function (data) {
      socket.emit('message', data);
    }

  };
};