var _    = require('lodash');
var Chat = require("../services/Chat");

exports.find = function (req, res) {
  Chat.find(req.query).then(function (chats) {
    res.json(chats);
  }, function (err) {
    res.status(err.code).json(err.message);
  })
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