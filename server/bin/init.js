var User    = require('../models').user;
var Chat    = require('../models').chat;
var Message = require('../models').message;
var faker   = require('faker');
var _       = require('lodash');
var Q       = require('q');
faker.lang  = 'en';

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
  }, options);
}

function createMessage(chat_id, user_id, time) {
  //content type
  var message = {
    chat_id: chat_id,
    user_id: user_id,
    created_time: time,
    updated_time: time,
    type: 'text',
    content: faker.lorem.sentence()
  };
  var num     = _.random(0, 9);
  if (num > 7) {
    message.type    = 'image';
    message.content = faker.image.image();
  }
  return message;
}

function createChats(users, admin, count) {
  users     = _.sample(users, count);
  var chats = [];
  _.each(users, function (user) {
    chats.push({
      user_ids: [user.id, admin.id],
      icon: user.avatar,
      title: user.nickname,
      messages: []
    });
  });
  return chats;
}

function initUsers() {
  var count = _.random(50, 120);
  var users = _.times(count, createUser);
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

function initAdmin() {
  var admin = createUser('admin');
  return Q.Promise(function (resolve, reject) {
    User.create(admin, function (err, admin) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('init admin success');
      resolve(admin);
    });
  });
}

function initChats(users, admin) {
  var count = _.random(3, 9);
  var chats = createChats(users, admin, count);
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

function initMessages(chat, index, chats) {
  var count     = _.random(2, 50);
  var min       = 1000;
  var max       = 5 * 60 * 1000;
  var now       = Date.now() - (count * max);
  chat.messages = _.times(count, function (index) {
    var time = now + (index * max) + _.random(min, max);
    return createMessage(chat.id, _.sample(chat.user_ids), time);
  });
  console.log(chat);
  chat.save(function (err, chat) {
    if (err) return console.log('init chat (' + index + '|' + chats.length + ') messages error : ' + err);
    console.log('init chat (' + index + '|' + chats.length + ') messages success');
  });
}

function init() {
  clear().then(function () {
    Q.all([
      initUsers(),
      initAdmin()
    ]).then(function (data) {
      return initChats(data[0], data[1])
    }).then(function (chats) {
      _.each(chats, initMessages);
    }, function (err) {
      console.log('init chats error : ' + err);
    }).catch(function (err) {
      console.log('error : ' + err);
    });
  });
}

function countUsers() {
  User.count(function (err, count) {
    if (err) return console.log('count users error : ' + err);
    console.log('the users count is : ' + count);
  });
}

init();