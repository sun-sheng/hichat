var modules = require('../server/models');
var User    = modules.user;
var Chat    = modules.chat;
var Message = modules.message;
var faker   = require('faker');
var _       = require('lodash');
var Q       = require('q');
faker.lang  = 'zh_CN';

var temp = {
  users: [],
  admin: null
};

var userDict = {};

var util = {
  around: function (items, index, num) {
    var max   = items.length;
    var start = index - num;
    var end   = index + num;
    if (start < 0) start = 0;
    if (end > max) end = max;
    var results = [];
    while (start < end) {
      results.push(items[start++]);
    }
    return results;
  }
};

function clearUsers() {
  return Q.Promise(function (resolve, reject) {
    User.remove(function (err) {
      if (err) {
        reject(err);
        return console.log('clear users error : ' + err);
      }
      console.log('clear users success');
      resolve();
    });
  })
}

function clearChats() {
  return Q.Promise(function (resolve, reject) {
    Chat.remove(function (err) {
      if (err) {
        reject(err);
        return console.log('clear chats error : ' + err);
      }
      console.log('clear chats success');
      resolve();
    });
  })
}

function clearMessages() {
  return Q.Promise(function (resolve, reject) {
    Message.remove(function (err) {
      if (err) {
        reject(err);
        return console.log('clear messages error : ' + err);
      }
      console.log('clear messages success');
      resolve();
    });
  })
}

function clear() {
  return Q.all([
    clearUsers(),
    clearChats(),
    clearMessages()
  ]);
}


function createUser(options) {
  if (typeof options === 'string') {
    var name = options;
    options  = {
      name: name,
      nickname: name,
      password: name,
      email: name + '@demo.com'
    };
  }
  var firstName = faker.name.firstName();
  return _.extend({
    name: firstName + ' ' + faker.name.lastName(),
    nickname: options.nickname || firstName,
    gender: faker.random.array_element([0, 1]),
    avatar: faker.internet.avatar(),
    city: faker.address.city(),
    signature: faker.lorem.sentence(),
    email: firstName + '@demo.com',
    password: firstName,
    mobile: faker.phone.phoneNumber()
    //bg_image: faker.image.nature(640, 400)
  }, options);
}

function createMessages(chat, user_id, time) {
  var messages = [];
  var message  = {
    chat_id: chat.id,
    user_id: user_id,
    created_at: time,
    updated_at: time,
    type: 'text',
    content: faker.lorem.sentence()
  };
  var num      = _.random(0, 9);
  if (num > 7) {
    message.type    = 'image';
    message.content = faker.image.image();
  }
  _.each(chat.user_ids, function (user_id) {
    var item         = _.clone(message);
    item.receiver_id = user_id;
    messages.push(item);
  });
  return messages;
}

function initUsers() {
  var count = _.random(50, 120);
  var users = _.times(count, createUser);
  var admin = createUser('admin');
  users.push(admin);
  return Q.Promise(function (resolve, reject) {
    User.create(users, function (err, users) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('init users success');
      resolve(users);
    });
  })
}

function initContacts() {
  var users = temp.users;
  var admin = temp.admin;
  _.each(users, function (user, index) {
    admin.contact_ids.push(user.id);
    user.contact_ids.push(admin.id);
    var num      = _.random(10, 30);
    var contacts = util.around(users, index, num);
    _.each(contacts, function (contact) {
      if (user.contact_ids.indexOf(contact.id) > -1) return true;
      user.contact_ids.push(contact.id);
      contact.contact_ids.push(user.id);
    });
  });
  return temp;
}

function initChats() {
  var users      = temp.users;
  var chats      = [];
  var CommonChat = {
    user_ids: [],
    type: 'group',
    icon: faker.image.image(),
    title: '公共讨论组'
  };
  _.each(users, function (user) {
    //
    CommonChat.user_ids.push(user.id);
    //
    var user_id = user.id;
    var num     = _.random(1, 3);
    var max     = user.contact_ids.length;
    var i       = 0;
    if (num > max) num = max;
    for (i; i < num; i++) {
      var contact_id = user.contact_ids[i];
      var exist    = _.some(chats, function (chat) {
        var ids = chat.user_ids;
        if (ids === 2) {
          if (ids[0] === user_id && ids[1] === contact_id) return true;
          if (ids[0] === contact_id && ids[1] === user_id) return true;
        }
        return false;
      });
      if (exist) continue;
      chats.push({user_ids: [user_id, contact_id]});
    }
  });
  chats.push(CommonChat);

  return Q.Promise(function (resolve, reject) {
    Chat.create(chats, function (err, chats) {
      if (err) {
        console.log('init chats failed : ' + err);
        return reject(err);
      }
      console.log('init chats success');
      resolve(chats);
    });
  });
}

function initMessages(chats) {

  var min      = 1000;
  var max      = 60 * 60 * 1000;
  var messages = [];
  _.each(chats, function (chat) {
    var count = chat.user_ids.length + 5;
    var time  = Date.now() - (count * max);
    _.times(count, function () {
      time += _.random(min, max);
      var user_id = _.sample(chat.user_ids);
      var results = createMessages(chat, user_id, time);
      messages    = messages.concat(results);
    });
  });
  return Message.create(messages).then(function (messages) {
    console.log('init messages success , the count is : ' + messages.length);
  }, function (err) {
    console.log(err);
  });
}

function init() {
  clear().then(initUsers).then(function (users) {
    temp.users = users;
    temp.admin = _.last(users);
    _.each(users, function (user) {
      userDict[user.id] = user;
    });
    initContacts();
  }).then(initChats).then(function (chats) {
    _.each(chats, function (chat) {
      _.each(chat.user_ids, function (user_id) {
        var user = userDict[user_id];
        user.chat_ids.push(chat.id);
      });
    });
    initMessages(chats).then(function () {
      var index = temp.users.length - 1;
      _.each(temp.users, function (user) {
        user.save(function (err, user) {
          var text = 'update user chat_ids and contact_ids ' + (err ? 'failed' + err : 'success');
          console.log(text);
          if (--index === 0) process.exit();
        });
      });
    });
  }).catch(function (err) {
    console.log(err);
  });
}

init();