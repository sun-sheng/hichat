var User    = require('../models').user;
var Chat    = require('../models').chat;
var Message = require('../models').message;
var Q       = require('q');

function clear() {
  clearUsers();
  clearChats();
  clearMessages();
}

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



exports.clear = function () {
  return Q.all([
    clearUsers(),
    clearChats(),
    clearMessages()
  ]);
};