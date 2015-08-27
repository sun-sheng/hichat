var Chat = require('../models/').chat;
var _    = require('lodash');
var util = require('../util');
var Q    = require('q');

module.exports = {
  get: function (id) {
    return Q.Promise(function (resolve, reject) {
      Chat.findOne({id: id}, function (err, chat) {
        if (err) return reject(util.createMongooseError(err));
        if (!chat) return reject(util.createServiceError('聊天信息不存在'));
        resolve(chat);
      });
    })
  },
  find: function (options) {
    return Q.Promise(function (resolve, reject) {
      Chat.find(options, function (err, chats) {
        if (err) return reject(util.createMongooseError(err));
        chats = chats || [];
        resolve(chats);
      });
    })
  },
  create: function (chat) {
    return Q.Promise(function (resolve, reject) {
      Chat.create(chat, function (err, chat) {
        if (err) return reject(util.createMongooseError(err));
        resolve(chat);
      })
    })
  },
  update: function (chat) {
    return Q.Promise(function (resolve, reject) {
      Chat.findOneAndUpdate({id: chat.id}, chat, function (err, chat) {
        if (err) return reject(util.createMongooseError(err));
        resolve(chat);
      })
    })
  },
  remove: function (id) {
    return Q.Promise(function (resolve, reject) {
      Chat.findOneAndUpdate({id: id}, {deleted: true}, function (err) {
        if (err) return reject(util.createMongooseError(err));
        resolve();
      })
    })
  },
  addUsers: function (id, user_ids) {
    return this.get(id).then(function (chat) {
      _.each(user_ids, function (user_id) {
        chat.user_ids.push(user_id);
      });
      return Q.Promise(function (resolve, reject) {
        chat.save(function (err, chat) {
          if (err) return reject(util.createMongooseError(err));
          resolve(chat);
        });
      });
    });
  },
  removeUsers: function (id, user_ids) {
    return this.get(id).then(function (chat) {
      _.each(user_ids, function (user_id) {
        _.remove(chat.user_ids, user_id);
      });
      return Q.Promise(function (resolve, reject) {
        chat.save(function (err, chat) {
          if (err) return reject(util.createMongooseError(err));
          resolve(chat);
        });
      });
    });
  },
  addMessages: function (id, messages) {
    return this.get(id).then(function (chat) {
      _.each(messages, function (message) {
        chat.messages.push(message);
      });
      return Q.Promise(function (resolve, reject) {
        chat.save(function (err, chat) {
          if (err) return reject(util.createMongooseError(err));
          resolve(chat);
        });
      });
    });
  }
};