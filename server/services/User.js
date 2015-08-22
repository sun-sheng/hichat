var User       = require('../models/').user;
var faker      = require('faker');
var _          = require('lodash');
var util       = require('../util');
var OnlineUser = require('./OnlineUser');
var Q          = require('q');
var uuid       = require('node-uuid');
faker.locale   = 'en'; //'zh_CN'

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
      User.findByIdAndUpdate(user.id, user, function (err, user) {
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
      user.expired_time = Date.now() + 24 * 60 * 60 * 1000;
      OnlineUser.add(user);
      return user;
    }, function () {
      return Q.reject(util.createMongooseError('用户名或密码输入错误'));
    });
  },

  logout: function (user) {
    OnlineUser.remove(user);
  },

  fake: function (options) {
    return _.extend({
      id: Number(_.uniqueId()),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      nickname: options.nickname || faker.name.firstName(),
      gender: faker.random.array_element([0, 1]),
      avatar: faker.internet.avatar(),
      city: faker.address.city(),
      signature: faker.lorem.sentence(),
      email: faker.name.firstName() + '@demo.com',
      mobile: faker.phone.phoneNumber()
    }, options);
  }
};