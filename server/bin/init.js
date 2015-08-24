var User    = require('../models').user;
var Chat    = require('../models').chat;
var Message = require('../models').message;
var faker   = require('faker');
var _       = require('lodash');
var Q       = require('q');
faker.lang  = 'en';

var temp = {
  users: [],
  admin: null
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
  var message = {
    chat_id: chat.id,
    user_id: user_id,
    created_at: time,
    updated_at: time,
    type: 'text',
    content: faker.lorem.sentence()
  };
  var num     = _.random(0, 9);
  if (num > 7) {
    message.type    = 'image';
    message.content = faker.image.image();
  }
  _.each(chat.user_ids, function (user_id) {
    var item = _.clone(message);
    item.receiver_id = user_id;
    messages.push(item);
  });
  return messages;
}

function createAdminChats(users, admin, count) {
  var chats = [];
  var commonChat = {
    user_ids: [],
    icon: faker.image.image(),
    title: '公共讨论组'
  };
  _.each(users, function (user) {
    commonChat.user_ids.push(user.id);
  });
  chats.push(commonChat);
  var p2pUsers = _.sample(users, count);
  _.each(p2pUsers, function (user) {
    chats.push({
      user_ids: [user.id, admin.id],
      icon: user.avatar,
      title: user.nickname
    });
  });
  return chats;
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

function createAdminContacts () {
  _.each(temp.users, function (user) {
    temp.admin.contact_ids.push(user.id);
    user.contact_ids.push(temp.admin.id);
  });
  return temp;
}

function initAdminChats() {
  var users = temp.users;
  var admin = temp.admin;
  var count = _.random(3, 9);
  var chats = createAdminChats(users, admin, count);
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

  var min = 1000;
  var max = 5 * 60 * 1000;
  var messages  = [];
  _.each(chats, function (chat) {
    var count = _.random(chat.user_ids.length, chat.user_ids.length + 50);
    var now   = Date.now() - (count * max);
    _.times(count, function (index) {
      var user_id = _.sample(chat.user_ids);
      var time = now + (index * max) + _.random(min, max);
      var results = createMessages(chat, user_id, time);
      messages = messages.concat(results);
    });
  });
  return Message.create(messages).then(function (messages) {
    console.log('init messages success , the count is : ' + messages.length);
  }, function (err) {
    console.log(err);
  });
}

function init() {
  clear().then(function () {
    initUsers().then(function (users) {
      temp.users = users;
      temp.admin = _.last(users);
      return createAdminContacts();
    }).then(function () {
      return initAdminChats();
    }).then(function (chats) {
      _.each(chats, function (chat) {
        _.each(chat.user_ids, function (user_id) {
          //console.log(user_id);
          //console.log(typeof user_id);
          //console.log(typeof temp.users[0].id);
          var user = _.find(temp.users, {id: user_id});
          user.chat_ids.push(chat.id);
        });
      });
      _.each(temp.users, function (user) {
        user.save(function (err, user) {
          if (err) return console.log('update user chat_ids and contact_ids failed : ' + err);
          console.log('update user chat_ids and contact_ids success');
        });
      });
      initMessages(chats);
    }).catch(function (err) {
      console.log('error : ' + err);
    });
  });
}

init();