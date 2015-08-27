var User       = require('../models/').user;
var _          = require('lodash');
var util       = require('../util');
var OnlineUser = require('./OnlineUser');
var Q          = require('q');
var uuid       = require('node-uuid');

module.exports = {

  get: function (id) {
    return this.findOne({id: id});
  },
  find: function (options) {
    return Q.Promise(function (resolve, reject) {
      options.deleted = false;
      User.find(options, function (err, users) {
        if (err) return reject(util.createMongooseError(err));
        users = users || [];
        resolve(users);
      });
    });
  },
  findOne: function (options) {
    return Q.Promise(function (resolve, reject) {
      options.deleted = false;
      User.findOne(options, function (err, user) {
        if (err) return reject(util.createMongooseError(err));
        if (!user) return reject(util.createServiceError('用户不存在'));
        resolve(user);
      });
    });
  },
  create: function (user) {
    return Q.Promise(function (resolve, reject) {
      User.create(user, function (err, user) {
        if (err) return reject(util.createMongooseError(err));
        resolve(user);
      })
    })
  },
  update: function (user) {
    return Q.Promise(function (resolve, reject) {
      User.findOneAndUpdate({id: user.id}, user, function (err, user) {
        if (err) return reject(util.createMongooseError(err));
        resolve(user);
      })
    })
  },
  remove: function (user_id) {
    return this.update({id: user_id, deleted: true});
  },

  login: function (query) {
    return this.findOne({
      email: query.email,
      password: query.password
    }).then(function (user) {
      user.access_token = uuid.v4();
      user.access_expired_at = Date.now() + 24 * 60 * 60 * 1000;
      user.save();
      OnlineUser.add(user);
      return user;
    }, function () {
      return Q.reject(util.createMongooseError('用户名或密码输入错误'));
    });
  },

  logout: function (user) {
    OnlineUser.remove(user);
  }
};