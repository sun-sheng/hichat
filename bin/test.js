var modules = require('../server/models');
var User    = modules.user;
var Chat    = modules.chat;
var Message = modules.message;
var _       = require('lodash');
var Q       = require('q');

function countUsers () {
  User.count(function (err, count) {
    if (err) return console.log('count users error : ' + err);
    console.log('the users count is : ' + count);
  });
}

function findMessages () {
  Message.find({chat_id:'1ea848c2-4973-11e5-9e8f-41206a0ae18c'}).then(function (results) {
    console.log(results.length);
    _.each(results, function (item) {
      console.log(item.receiver_id === '1fd3a961-4973-11e5-9e8f-41206a0ae18c');
    })
  });
}

function findAdmin () {
  User.findOne({name: 'admin'}, function (err, user) {
    if (err) return console.log(err);
    console.log(user.id);
  });
}

findAdmin();