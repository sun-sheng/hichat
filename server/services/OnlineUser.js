var _ = require('lodash');
var users      = {};
var length     = 0;
module.exports = {
  add: function (user) {
    if (!users[user.id]) length++;
    users[user.id] = user;
  },
  get: function (id) {
    var user = users[id];
    if (!user) return null;
    if (user.access_expired_at > Date.now()) return user;
    return this.remove(user);
  },
  findWhere: function (source) {
    var user = _.findWhere(users, source);
    if (!user) return null;
    if (user.access_expired_at > Date.now()) return user;
    return this.remove(user);
  },
  remove: function (user) {
    if (users[user.id]) {
      users[user.id] = undefined;
      length --;
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