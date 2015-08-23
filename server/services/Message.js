var Message = require('../models/').message;
var _       = require('lodash');
var util    = require('../util');
var Q       = require('q');

module.exports = {

  get: function (id) {
    return Q.Promise(function (resolve, reject) {
      Message.findOne({id: id}, function (err, message) {
        if (err) return reject(util.createMongooseError(err));
        if (!message) return reject(util.createServiceError('聊天信息不存在'));
        resolve(message);
      });
    })
  },
  find: function (options) {
    return Q.Promise(function (resolve, reject) {
      Message.find(options, function (err, messages) {
        if (err) return reject(util.createMongooseError(err));
        messages = messages || [];
        resolve(messages);
      });
    })
  },
  create: function (message) {
    return Q.Promise(function (resolve, reject) {
      Message.create(message, function (err, message) {
        if (err) return reject(util.createMongooseError(err));
        resolve(message);
      })
    })
  },

  update: function (message) {
    return Q.Promise(function (resolve, reject) {
      Message.findOneAndUpdate({id: message.id}, message, function (err) {
        if (err) return reject(util.createMongooseError(err));
        resolve(message);
      })
    })
  },

  remove: function (id) {
    return Q.Promise(function (resolve, reject) {
      Message.findOneAndUpdate({id: id}, {deleted: true}, function (err) {
        if (err) return reject(util.createMongooseError(err));
        resolve(id);
      })
    })
  }

};