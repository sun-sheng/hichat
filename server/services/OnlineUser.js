var _ = require('lodash');
var users      = {};
var length     = 0;
module.exports = {
  get: function (id) {
    return users[id];
  },
  add: function (user) {
    if (!users[user.id]) length++;
    users[user.id] = user;
  },
  findWhere: function (source) {
    return _.findWhere(users, source);
  },
  remove: function (user) {
    if (users[user.id]) {
      users[user.id] = undefined;
      length--;
    }
  },
  clear: function () {
    users  = {};
    length = 0;
  },
  count: function () {
    return length;
  }
};