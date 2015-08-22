var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
exports.user = require('./user');
exports.chat = require('./chat');
exports.message = require('./message');


