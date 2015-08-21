var faker = require('faker');
var _     = require('lodash');
//faker.locale = 'zh_CN';
faker.locale = 'en';

module.exports = {

  get: function (user_id) {

  },
  add: function (user) {

  },
  update: function (user) {

  },
  remove: function (user) {

  },

  find: function (options) {

  },

  fake: function (options) {
    return _.extend({
      id: Number(_.uniqueId()),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      nickname: options.nickname || faker.name.firstName(),
      sex: faker.random.array_element([0, 1]),
      avatar: faker.internet.avatar(),
      city: faker.address.city(),
      signature: faker.lorem.sentence(),
      email: faker.name.firstName() + '@demo.com',
      mobile: faker.phone.phoneNumber(),
      created_at: Date.now(),
      updated_at: Date.now()
    }, options);
  }
};