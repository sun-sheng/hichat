var _    = require('lodash');
var Chat = require('../services/Chat');
var User = require('../services/User');

exports.find = function (req, res) {
  var query = req.query;
  query.id = { $in: req.user.chat_ids };
  Chat.find(query).then(function (chats) {
    var temp = {};
    _.each(chats, function (chat) {
      _.each(chat.user_ids, function (id) {
        temp[id] = 1;
      });
    });
    var ids = _.keys(temp);
    return User.find({id: {$in: ids}}).then(function (users) {
      temp = {};
      _.each(users, function (user) {
        temp[user.id] = user;
      });
      _.each(chats, function (chat) {
        chat.users = {};
        _.each(chat.user_ids, function (id) {
          var user = temp[id];
          chat.users[id] = user;
          if (chat.type === 'p2p' && id !== req.user.id) {
            chat.icon = user.avatar;
            chat.title = user.nickname;
          }
        });
      });
      return chats;
    }).catch(function (err) {
      console.log(err);
    });
  }).then(function (chats) {
    res.json(chats);
  }, function (err) {
    res.status(err.code).json(err.message);
  });
};

exports.create = function (req, res) {
  Chat.create(req.body).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.status(err.code).json(err.message);
  });
};

exports.update = function (req, res) {
  var chat = req.body;
  chat.id  = chat.id || req.params.chat_id;
  Chat.update(chat).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.status(err.code).json(err.message);
  });
};

exports.remove = function (req, res) {
  Chat.remove(req.params.chat_id).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.json(err.code, err.message);
  });
};

exports.addUsers = function (req, res) {
  Chat.addUsers(req.params.chat_id, req.body).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.json(err.code, err.message);
  });
};

exports.removeUsers = function (req, res) {
  Chat.removeUsers(req.params.chat_id, req.body).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.json(err.code, err.message);
  });
};

exports.addMessages = function (req, res) {
  Chat.addMessages(req.params.chat_id, req.body).then(function (chat) {
    res.json(chat);
  }, function (err) {
    res.json(err.code, err.message);
  });
};